import { WSService } from '../services/ws.service.ts';
import { HeartRateStore } from './heartrate.store.ts';
class RootStore {
    heartRateStore;
    constructor() {
        this.heartRateStore = new HeartRateStore(new WSService());
    }
}
export const rootStore = new RootStore();
