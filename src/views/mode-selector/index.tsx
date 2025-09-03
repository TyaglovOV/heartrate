import { observer } from "mobx-react-lite"

import { useStores } from "@/src/providers.tsx"

export const ModeSelector = observer(() => {
    const {
        heartRateStore: { isConnected, connect, disconnect },
    } = useStores()

    return (
        <div className="mb-4">
            <button
                onClick={disconnect}
                disabled={!isConnected}
                className="bg-blue-900 hover:bg-blue-800 disabled:bg-blue-600 disabled:cursor-default text-white font-bold py-2 px-4 rounded cursor-pointer m-2"
            >
                local
            </button>

            <button
                onClick={connect}
                disabled={isConnected}
                className="hover:bg-yellow-600 bg-yellow-700 disabled:bg-yellow-500 disabled:cursor-default text-white font-bold py-2 px-4 rounded cursor-pointer m-2"
            >
                server
            </button>
        </div>
    )
})
