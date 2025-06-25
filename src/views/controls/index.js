import { jsx as _jsx } from "react/jsx-runtime";
import { observer } from 'mobx-react-lite';
import { useStores } from '../../providers.tsx';
import { ControlsPanel } from './controls-panel.tsx';
export const Controls = observer(() => {
    const { heartRateStore: { isConnected, isPending, setHeartRate, setServerHeartRate, currentHeartRate } } = useStores();
    if (!isConnected) {
        return _jsx(ControlsPanel, { mode: 'local', disabled: isPending, setHeartRate: setHeartRate, currentHeartRate: currentHeartRate });
    }
    return _jsx(ControlsPanel, { mode: 'server', disabled: isPending, setHeartRate: setServerHeartRate, currentHeartRate: currentHeartRate });
});
