import { makeAutoObservable, runInAction } from 'mobx';
import { WSService } from '../services/ws.service.ts';
import { DEFAULT_HEART_RATE, MAX_HEART_RATE, MIN_HEART_RATE } from '../config.ts';

export class HeartRateStore {
  // improve -- divide local and server heartrate
  currentHeartRate: number = DEFAULT_HEART_RATE
  isConnected: boolean = false
  isPending: boolean = false
  wsService: WSService

  constructor(wsService: WSService) {
    this.wsService = wsService
    makeAutoObservable(this);
  }

  setHeartRate = (heartRate: number) => {
    this.currentHeartRate = Math.min((Math.max(heartRate, MIN_HEART_RATE)), MAX_HEART_RATE)
  }

  // slice of server logic is flooding this place
  setServerHeartRate = (heartRate: number) => {
    if (!this.isConnected) {
      return
    }

    // slice of server logic is flooding this place
    // this.setHeartRate(heartRate) -- uncomment to sync
    this.wsService.sendMessage(heartRate.toString())
  }

  connect = async () => {
    this.isPending = true

    await this.wsService.connect()

    runInAction(() => {
      this.isConnected = true
      this.isPending = false
    })

    await this.wsService.subscribe(this.setHeartRate)
  }

  disconnect = async () => {
    this.isPending = true

    await this.wsService.disconnect()
    this.wsService.unsubscribe()

    runInAction(() => {
      this.isConnected = false
      this.isPending = false
    })
  }
}
