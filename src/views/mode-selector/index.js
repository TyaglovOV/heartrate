import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from 'mobx-react-lite';
import { useStores } from '../../providers.tsx';
export const ModeSelector = observer(() => {
    const { heartRateStore: { isConnected, connect, disconnect } } = useStores();
    return (_jsxs("div", { className: 'mb-4', children: [_jsx("button", { onClick: disconnect, disabled: !isConnected, className: "bg-blue-900 hover:bg-blue-800 disabled:bg-blue-600 disabled:cursor-default text-white font-bold py-2 px-4 rounded cursor-pointer m-2", children: "local" }), _jsx("button", { onClick: connect, disabled: isConnected, className: "hover:bg-yellow-600 bg-yellow-700 disabled:bg-yellow-500 disabled:cursor-default text-white font-bold py-2 px-4 rounded cursor-pointer m-2", children: "server" })] }));
});
