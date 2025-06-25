import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HeartRateStore } from './heartrate.store.ts'
import { DEFAULT_HEART_RATE, MIN_HEART_RATE, MAX_HEART_RATE } from '../config'

vi.mock('../mocks/browser', () => ({
  worker: {
    start: vi.fn(() => Promise.resolve('mocked-worker')),
  },
}))

describe('HeartRateStore', () => {
  let store: HeartRateStore
  let wsServiceMock: any

  beforeEach(() => {
    wsServiceMock = {
      connect: vi.fn(() => Promise.resolve()),
      disconnect: vi.fn(() => Promise.resolve()),
      subscribe: vi.fn(() => Promise.resolve()),
      unsubscribe: vi.fn(),
      sendMessage: vi.fn(),
    }

    store = new HeartRateStore(wsServiceMock)
  })

  it('should initialize with default values', () => {
    expect(store.currentHeartRate).toBe(DEFAULT_HEART_RATE)
    expect(store.isConnected).toBe(false)
    expect(store.isPending).toBe(false)
  })

  it('should normalize heart rate in setHeartRate', () => {
    store.setHeartRate(999)
    expect(store.currentHeartRate).toBe(MAX_HEART_RATE)

    store.setHeartRate(1)
    expect(store.currentHeartRate).toBe(MIN_HEART_RATE)

    store.setHeartRate(75)
    expect(store.currentHeartRate).toBe(75)
  })

  it('should send heart rate to server if connected', () => {
    store.isConnected = true
    store.setServerHeartRate(100)
    expect(wsServiceMock.sendMessage).toHaveBeenCalledWith('100')
  })

  it('should not send heart rate if not connected', () => {
    store.isConnected = false
    store.setServerHeartRate(100)
    expect(wsServiceMock.sendMessage).not.toHaveBeenCalled()
  })

  it('connect should update flags and subscribe', async () => {
    const subscribeSpy = vi.fn()
    wsServiceMock.subscribe = subscribeSpy

    const store = new HeartRateStore(wsServiceMock)

    const promise = store.connect()

    expect(store.isPending).toBe(true)

    await promise

    expect(wsServiceMock.connect).toHaveBeenCalled()
    expect(subscribeSpy).toHaveBeenCalled()
    expect(store.isConnected).toBe(true)
    expect(store.isPending).toBe(false)
  })

  it('disconnect should update flags and unsubscribe', async () => {
    store.isConnected = true

    const promise = store.disconnect()

    expect(store.isPending).toBe(true)

    await promise

    expect(wsServiceMock.disconnect).toHaveBeenCalled()
    expect(wsServiceMock.unsubscribe).toHaveBeenCalled()
    expect(store.isConnected).toBe(false)
    expect(store.isPending).toBe(false)
  })
})
