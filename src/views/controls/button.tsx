import type { ReactNode } from "react"

export const Button = ({
    onClick,
    children,
    disabled,
}: {
    onClick: () => void
    children: ReactNode
    disabled: boolean
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer m-2`}
        >
            {children}
        </button>
    )
}
