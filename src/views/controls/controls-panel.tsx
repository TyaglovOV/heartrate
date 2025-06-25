import { useEffect, useState } from 'react';
import { Button } from './button.tsx';

const increases = [1, 10, 50]

export const ControlsPanel = ({ currentHeartRate, setHeartRate, disabled, mode }: {
  currentHeartRate: number,
  setHeartRate: (value: number) => void,
  disabled: boolean,
  mode: 'local' | 'server'
}) => {
  const [inputValue, setInputValue] = useState(currentHeartRate)

  const onChangeHeartRate = (value: number) => {
    setHeartRate(value)
  }

  useEffect(() => {
    setInputValue(currentHeartRate)
  }, [currentHeartRate])

  const bg = mode === 'local' ? 'bg-blue' : 'bg-yellow'

  return (
    <div className="flex flex-row items-center justify-between">
      <Button bg={bg} disabled={disabled} onClick={() => onChangeHeartRate(0)}>
        min
      </Button>

      {increases.map((item) => (
        <Button bg={bg}  disabled={disabled} key={item} onClick={() => onChangeHeartRate(currentHeartRate - item)}>
          -{item}
        </Button>
      )).reverse()}

      <input type="number"
             min={1}
             max={1000}
             className="bg-gray focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal ml-2 mr-2"
             placeholder="manual change"
             value={inputValue}
             onChange={(e) => setInputValue(Number(e.target.value))}
             onBlur={(e) => onChangeHeartRate(Number(e.target.value))}
      />

      {increases.map((item) => (
        <Button bg={bg}  disabled={disabled} key={item} onClick={() => onChangeHeartRate(currentHeartRate + item)}>
          +{item}
        </Button>
      ))}

      <Button bg={bg}  disabled={disabled} onClick={() => onChangeHeartRate(1000)}>
        max
      </Button>
    </div>
  )
}
