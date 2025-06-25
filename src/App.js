import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { Heart } from './views/heart';
import { StoresProvider } from './providers.tsx';
import { MainLayout } from './views/main-layout';
import { ModeSelector } from './views/mode-selector';
import { Controls } from './views/controls';
function App() {
    return (_jsx(StoresProvider, { children: _jsxs(MainLayout, { children: [_jsx(Heart, {}), _jsx(ModeSelector, {}), _jsx(Controls, {})] }) }));
}
export default App;
