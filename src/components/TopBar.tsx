import css from '../lib/css'
import Button from './ui/Button'
import Checkbox from './ui/Checkbox'
import Input from './ui/Input'

const styleContainer = css`
  display: flex;
  gap: 1rem;
  width: 100%;
`

interface FilterOptions {
  hideEmpty: boolean
}

interface FilterBarProps {
  onInput: (value: string | ((prevState: string) => string)) => void
  onOptions: (
    value: FilterOptions | ((prevState: FilterOptions) => FilterOptions)
  ) => void
  onExport: () => void
}

const TopBar = ({ onInput, onOptions, onExport }: FilterBarProps) => {
  const handleCheckbox = (checked: boolean) => {
    onOptions((prev) => ({
      ...prev,
      hideEmpty: checked,
    }))
  }

  return (
    <div class={styleContainer}>
      <Input placeholder="Search..." onInput={onInput} />
      <Checkbox onCheck={handleCheckbox} label="Hide empty?" />
      <Button onClick={onExport}>Export</Button>
    </div>
  )
}

export default TopBar
export type { FilterOptions }
