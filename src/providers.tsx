import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import type { TRootStore } from "./stores"
import { rootStore } from "./stores"

const StoreContext = createContext<TRootStore>(rootStore)

export const StoresProvider = ({ children }: { children: ReactNode }) => {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

export const useStores = () => useContext(StoreContext)
