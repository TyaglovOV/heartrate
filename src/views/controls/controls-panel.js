import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from './button.tsx';
const increases = [1, 10, 50];
export const ControlsPanel = ({ currentHeartRate, setHeartRate, disabled, mode }) => {
    const [inputValue, setInputValue] = useState(currentHeartRate);
    const onChangeHeartRate = (value) => {
        setHeartRate(value);
    };
    useEffect(() => {
        setInputValue(currentHeartRate);
    }, [currentHeartRate]);
    const bg = mode === 'local' ? 'bg-blue' : 'bg-yellow';
    return (_jsxs("div", { className: "flex flex-row items-center justify-between", children: [_jsx(Button, { bg: bg, disabled: disabled, onClick: () => onChangeHeartRate(0), children: "min" }), increases.map((item) => (_jsxs(Button, { bg: bg, disabled: disabled, onClick: () => onChangeHeartRate(currentHeartRate - item), children: ["-", item] }, item))).reverse(), _jsx("input", { type: "number", min: 1, max: 1000, className: "bg-gray focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal ml-2 mr-2", placeholder: "manual change", value: inputValue, onChange: (e) => setInputValue(Number(e.target.value)), onBlur: (e) => onChangeHeartRate(Number(e.target.value)) }), increases.map((item) => (_jsxs(Button, { bg: bg, disabled: disabled, onClick: () => onChangeHeartRate(currentHeartRate + item), children: ["+", item] }, item))), _jsx(Button, { bg: bg, disabled: disabled, onClick: () => onChangeHeartRate(1000), children: "max" })] }));
};
