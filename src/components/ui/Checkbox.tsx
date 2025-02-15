import css from '../../lib/css'

interface CheckboxProps {
  onCheck: (checked: boolean) => void
  label?: string
  name?: string
}

const Checkbox = ({ onCheck, label, name }: CheckboxProps) => {
  const handleCheck = (e: InputEvent) => {
    const inputElement = e.currentTarget as HTMLInputElement
    onCheck(inputElement.checked)
  }

  return (
    <div
      class={css`
        display: flex;
        align-items: center;
        flex-shrink: 0;
      `}
    >
      <input
        type="checkbox"
        name={name}
        onInput={handleCheck}
      />
      {label && (
        <label
          class={css`
            margin-left: 0.5rem;
          `}
          htmlFor={name}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
