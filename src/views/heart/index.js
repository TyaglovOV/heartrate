import { jsx as _jsx } from "react/jsx-runtime";
import { HeartIcon } from './heart-icon.tsx';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../providers';
export const Heart = observer(() => {
    const { heartRateStore: { currentHeartRate } } = useStores();
    return (_jsx("div", { className: "p-4", children: _jsx(HeartIcon, { bpm: currentHeartRate }) }));
});
