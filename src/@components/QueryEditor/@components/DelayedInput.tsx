import { Input } from '@grafana/ui'
import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react'

type InferFcProps<T > = T extends React.FC<infer C> ? C : never

export interface DelayedInputProps extends InferFcProps<typeof Input> {
  inputDelay: number
}

export default function DelayedInput ({
  onChange,
  inputDelay,
  value: actualValue,
  ...props
}: DelayedInputProps): ReactElement {
  const [value, setValue] = useState<ChangeEvent<HTMLInputElement> | undefined>(undefined)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (value === undefined) return
    const timeout = setTimeout(() => {
      if (value !== undefined && onChange !== undefined) onChange(value)
      setValue(undefined)
    }, inputDelay)
    timeoutRef.current = timeout
    return () => clearTimeout(timeout)
  }, [inputDelay, onChange, value])

  return <Input
    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e)}
    value={value?.target.value ?? actualValue}
    {...props}
  />
}
