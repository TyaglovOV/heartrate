import { worker } from '../mocks/browser'

export class WSService {
  activeConnection?: WebSocket

  connect = async () => {
    await this.disconnect()
    // place to improve
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    })

    this.activeConnection = new WebSocket('ws://heart.rate')
  }

  disconnect = async () => {
    if (!this.activeConnection) {
      return
    }

    this.activeConnection.onopen = null;
    this.activeConnection.onmessage = null;
    this.activeConnection.onclose = null;
    this.activeConnection.onerror = null;

    const closeSocket = async (): Promise<void> => {
      return new Promise((resolve) => {
        if (!this.activeConnection || this.activeConnection.readyState === WebSocket.CLOSED) {
          resolve()
          return
        }

        this.activeConnection.onclose = () => resolve()
        this.activeConnection.close(1000, 'close connection; reason: manual reconnect')
      })
    }

    await closeSocket()
  }

  subscribe = async (onMessage: (num: number) => void) => {
    if (!this.activeConnection) {
      console.log('no active connection, connecting...')
      await this.connect()
    }

    if (!this.activeConnection) {
      throw new Error('impossible to connect')
    }

    this.activeConnection.onmessage = (data) => {
      onMessage(data.data)
    }
  }

  unsubscribe = () => {
    if (!this.activeConnection) {
      console.log('no active connection already')
      return
    }

    this.activeConnection.onmessage = null
  }

  sendMessage = (data: any) => {
    if (!this.activeConnection) {
      console.log('no active connection')
      return
    }

    this.activeConnection.send(data)
  }
}
