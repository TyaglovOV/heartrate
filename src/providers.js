import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { rootStore } from './stores';
const StoreContext = createContext(rootStore);
export const StoresProvider = ({ children }) => {
    return (_jsx(StoreContext.Provider, { value: rootStore, children: children }));
};
export const useStores = () => useContext(StoreContext);
