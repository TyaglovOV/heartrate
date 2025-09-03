import "@/src/App.css"

import { StoresProvider } from "@/src/providers.tsx"
import { Controls } from "@/src/views/controls"
import { Heart } from "@/src/views/heart"
import { MainLayout } from "@/src/views/main-layout"
import { ModeSelector } from "@/src/views/mode-selector"

function App() {
    return (
        <StoresProvider>
            <MainLayout>
                <Heart />
                <ModeSelector />
                <Controls />
            </MainLayout>
        </StoresProvider>
    )
}

export default App
