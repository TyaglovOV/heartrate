import { beforeEach, describe, expect, it, vi } from 'vitest'
import { WSService } from './ws.service'
import { worker } from '../mocks/browser'

vi.mock('../mocks/browser', () => ({
  worker: {
    start: vi.fn(() => Promise.resolve('mocked-worker')),
  },
}))

describe('WSService', () => {
  let wsMock: WebSocket
  let wsService: WSService

  beforeEach(() => {
    wsMock = {
      // @ts-ignore
      readyState: WebSocket.OPEN,
      onopen: null,
      onmessage: null,
      onclose: null,
      onerror: null,
      send: vi.fn(),
      close: vi.fn(function (this: WebSocket) {
        // эмулируем нормальное закрытие
        setTimeout(() => {
          // @ts-ignore
          this.readyState = WebSocket.CLOSED
          this.onclose?.(new CloseEvent('close'))
        }, 0)
      }),
    } as unknown as WebSocket

    // @ts-ignore
    global.WebSocket = vi.fn(() => wsMock)

    wsService = new WSService()
  })

  it('should start MSW and create WebSocket connection', async () => {
    await wsService.connect()

    expect(worker.start).toHaveBeenCalledOnce()
    expect(global.WebSocket).toHaveBeenCalledWith('ws://heart.rate')
  })

  it('should assign onmessage handler and receive message', async () => {
    const callback = vi.fn()
    await wsService.connect()
    await wsService.subscribe(callback)

    const messageEvent = new MessageEvent('message', { data: 123 })
    wsMock.onmessage?.(messageEvent)

    expect(callback).toHaveBeenCalledWith(123)
  })

  it('should remove onmessage on unsubscribe', async () => {
    await wsService.connect()
    await wsService.subscribe(() => {})
    wsService.unsubscribe()
    expect(wsMock.onmessage).toBeNull()
  })

  it('should send message if connected', async () => {
    await wsService.connect()
    wsService.sendMessage('ping')
    expect(wsMock.send).toHaveBeenCalledWith('ping')
  })

  it('should not send message if not connected', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    wsService.sendMessage('ping')
    expect(consoleSpy).toHaveBeenCalledWith('no active connection')
    consoleSpy.mockRestore()
  })

  it('should not throw if disconnect called with no connection', async () => {
    await expect(wsService.disconnect()).resolves.toBeUndefined()
  })
})
