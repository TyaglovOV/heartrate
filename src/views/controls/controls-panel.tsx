import type { FocusEvent } from "react"
import { useEffect, useState } from "react"

import { MAX_HEART_RATE, MIN_HEART_RATE } from "@/src/config.ts"

import { Button } from "./button.tsx"

const increases = [1, 10, 50]

export const ControlsPanel = ({
    currentHeartRate,
    setHeartRate,
    disabled,
}: {
    currentHeartRate: number
    setHeartRate: (value: number) => void
    disabled: boolean
}) => {
    const [inputValue, setInputValue] = useState(currentHeartRate)

    const onChangeHeartRate = (value: number) => {
        setHeartRate(value)
    }

    const onInputChange = (e: FocusEvent<HTMLInputElement>) => {
        const val = Math.min(
            Math.max(e?.target?.value ? Number(e?.target?.value) : 0, MIN_HEART_RATE),
            MAX_HEART_RATE,
        )
        setInputValue(val)
        onChangeHeartRate(val)
    }

    useEffect(() => {
        setInputValue(currentHeartRate)
    }, [currentHeartRate])

    return (
        <div className="flex flex-row items-center justify-between">
            <Button disabled={disabled} onClick={() => onChangeHeartRate(MIN_HEART_RATE)}>
                min
            </Button>

            {increases
                .map((item) => (
                    <Button
                        disabled={disabled}
                        key={item}
                        onClick={() => onChangeHeartRate(currentHeartRate - item)}
                    >
                        -{item}
                    </Button>
                ))
                .reverse()}

            <input
                type="number"
                disabled={disabled}
                min={1}
                max={1000}
                className="bg-gray focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal ml-2 mr-2"
                placeholder="manual change"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                onBlur={onInputChange}
            />

            {increases.map((item) => (
                <Button
                    disabled={disabled}
                    key={item}
                    onClick={() => onChangeHeartRate(currentHeartRate + item)}
                >
                    +{item}
                </Button>
            ))}

            <Button disabled={disabled} onClick={() => onChangeHeartRate(MAX_HEART_RATE)}>
                max
            </Button>
        </div>
    )
}
