import { makeAutoObservable, runInAction } from 'mobx';
import { WSService } from '../services/ws.service.ts';
const defaultHeartRate = 70;
export const MaxHeartRate = 250;
export const MinHeartRate = 26;
export class HeartRateStore {
    wsService;
    // improve -- add divide local and server heartrate
    currentHeartRate = defaultHeartRate;
    isConnected = false;
    isPending = false;
    constructor(wsService) {
        this.wsService = wsService;
        makeAutoObservable(this);
    }
    setHeartRate = (heartRate) => {
        this.currentHeartRate = Math.min((Math.max(heartRate, MinHeartRate)), MaxHeartRate);
    };
    // slice of server logic is flooding this place
    setServerHeartRate = (heartRate) => {
        if (!this.isConnected) {
            return;
        }
        // slice of server logic is flooding this place
        // this.setHeartRate(heartRate) -- uncomment to sync
        this.wsService.sendMessage(heartRate.toString());
    };
    connect = async () => {
        this.isPending = true;
        await this.wsService.connect();
        runInAction(() => {
            this.isConnected = true;
            this.isPending = false;
        });
        await this.wsService.subscribe(this.setHeartRate);
    };
    disconnect = async () => {
        this.isPending = true;
        await this.wsService.disconnect();
        runInAction(() => {
            this.isConnected = false;
            this.isPending = false;
        });
    };
}
