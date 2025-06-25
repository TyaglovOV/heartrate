import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ bg, onClick, children, disabled }) => {
    return _jsx("button", { onClick: onClick, disabled: disabled, className: `${bg}-700 hover:${bg}-500 text-white font-bold py-2 px-4 rounded cursor-pointer m-2`, children: children });
};
