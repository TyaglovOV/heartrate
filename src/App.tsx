import './App.css'
import { Heart } from './views/heart/index.tsx';
import { StoresProvider } from './providers.tsx';
import { MainLayout } from './views/main-layout'
import { ModeSelector } from './views/mode-selector';
import { Controls } from './views/controls';

function App() {
  return (
    <StoresProvider>
      <MainLayout>
        <Heart/>
        <ModeSelector />
        <Controls />
      </MainLayout>
    </StoresProvider>
  )
}

export default App
