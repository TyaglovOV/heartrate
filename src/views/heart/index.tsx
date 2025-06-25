import { HeartIcon } from './heart-icon.tsx'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../providers'
import { useLayoutEffect, useRef, useState } from 'react';

export const Heart = observer(() => {
  const { heartRateStore: { currentHeartRate } } = useStores()
  const [bpm, setBpm] = useState(currentHeartRate)
  const startTimeRef = useRef<number>(performance.now())
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // sync function for heartrate -- remove twitching
  useLayoutEffect(() => {
    if (bpm === currentHeartRate) {
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const now = performance.now()
    const elapsed = now - startTimeRef.current
    const duration = (60 / bpm) * 1000
    const remainingTime = duration - (elapsed % duration)

    timeoutRef.current = setTimeout(() => {
      setBpm(currentHeartRate)
      startTimeRef.current = performance.now()
    }, remainingTime)

    return () => clearTimeout(timeoutRef.current)
  }, [bpm, currentHeartRate])

  return (
    <div className="p-10">
      <HeartIcon bpm={bpm} />
    </div>
  )
})
