import './styles.css'
import { memo, useEffect, useRef } from 'react';

export const HeartIcon = memo(function HeartIcon ({ bpm }: { bpm: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const duration = 60 / bpm

  useEffect(() => {
    if (ref.current && ref.current?.style) {
      ref.current.style.animationDuration = `${duration}s`
    }
  }, [duration]);

  let color

  if (bpm < 111) {
    color = 'green'
  } else if (bpm < 180) {
    color = 'yellow'
  } else {
    color = 'red'
  }

  // place to improve animation
  const animationName ='heartbeat-fast'

  return <div style={{
    animationName: `${animationName}`,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDuration: `${duration}s`,
  }}>
    <svg width="200px"
         height="200px"
         viewBox="0 0 24 24"
         fill="none"
         className={`inside ${color}`}
         xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
      />
    </svg>
  </div>
})
