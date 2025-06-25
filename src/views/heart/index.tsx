import { HeartIcon } from './heart-icon.tsx'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../providers'

export const Heart = observer(() => {
  const { heartRateStore: { currentHeartRate } } = useStores()

  return (
    <div className="p-4">
      <HeartIcon bpm={currentHeartRate} />
    </div>
  )
})
