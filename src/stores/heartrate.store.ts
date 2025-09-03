import { makeAutoObservable, runInAction } from "mobx"

import { DEFAULT_HEART_RATE, MAX_HEART_RATE, MIN_HEART_RATE } from "@/src/config.ts"
import { WSService } from "@/src/services/ws.service.ts"

export class HeartRateStore {
    // improve -- divide local and server heartrate
    currentHeartRate: number = DEFAULT_HEART_RATE
    isConnected: boolean = false
    isPending: boolean = false
    wsService: WSService

    constructor(wsService: WSService) {
        this.wsService = wsService
        makeAutoObservable(this)
    }

    setHeartRate = (heartRate: number) => {
        this.currentHeartRate = Math.min(Math.max(heartRate, MIN_HEART_RATE), MAX_HEART_RATE)
    }

    // slice of server logic is flooding this place
    setServerHeartRate = (heartRate: number) => {
        if (!this.isConnected) {
            return
        }

        // slice of server logic is flooding this place
        this.wsService.sendMessage(heartRate.toString())
    }

    connect = async () => {
        this.isPending = true

        try {
            await this.wsService.connect()

            runInAction(() => {
                this.isConnected = true
            })

            await this.wsService.subscribe(this.setHeartRate)
        } catch (error) {
            console.error("Error connecting to WebSocket:", error)
        } finally {
            runInAction(() => {
                this.isPending = false
            })
        }
    }

    disconnect = async () => {
        this.isPending = true

        try {
            await this.wsService.disconnect()

            runInAction(() => {
                this.wsService.unsubscribe()
                this.isConnected = false
            })
        } catch (error) {
            console.error("Error disconnecting from WebSocket:", error)
        } finally {
            runInAction(() => {
                this.isPending = false
            })
        }
    }
}
