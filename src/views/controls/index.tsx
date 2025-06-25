import { observer } from 'mobx-react-lite';
import { useStores } from '../../providers.tsx'
import { ControlsPanel } from './controls-panel.tsx';

export const Controls = observer(() => {
  const { heartRateStore: { isConnected, isPending, setHeartRate, setServerHeartRate, currentHeartRate } } = useStores()

  if (!isConnected) {
    return <ControlsPanel
      disabled={isPending}
      setHeartRate={setHeartRate}
      currentHeartRate={currentHeartRate}
    />
  }

  return <ControlsPanel
    disabled={isPending}
    setHeartRate={setServerHeartRate}
    currentHeartRate={currentHeartRate}
  />
})
