import { useEffect, useState } from 'preact/hooks'
import useDebounce from '../../hooks/useDebounce'
import type { Entry } from '../../lib/save-file'
import Input from '../ui/Input'

const DefaultEditor = ({ entry }: { entry: Entry }) => {
  const [value, setValue] = useState(entry.value)
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    setValue(entry.value)
  }, [entry])

  useEffect(() => {
    if (value !== entry.value) {
      entry.value = value
    }
  }, [debouncedValue])

  return (
    <Input
      onInput={(e) => setValue(e)}
      label="Value"
      value={value as string}
      name="value"
    />
  )
}

export default DefaultEditor
