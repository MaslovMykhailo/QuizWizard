import {ChangeEvent, ChangeEventHandler, useCallback, useState} from 'react'

type Target = HTMLInputElement | HTMLTextAreaElement

const defaultGetValue = <T>(event: ChangeEvent<Target>) =>
  event.target.value as unknown as T

export const useInputState = <T>(
  initialValue?: T,
  getValue: (event: ChangeEvent<Target>) => T = defaultGetValue
) => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback<ChangeEventHandler<Target>>(
    (event) => setValue(getValue(event)),
    [getValue]
  )
  return [value, onChange] as const
}
