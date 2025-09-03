import type { ReactNode } from "react"

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return <div className="min-h-screen flex flex-col items-center justify-center">{children}</div>
}
