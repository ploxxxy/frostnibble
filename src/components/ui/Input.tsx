import css from '../../lib/css'

interface InputProps {
  value?: string
  onInput: (value: string) => void
  label?: string
  name?: string
  placeholder?: string
}

const styleInput = css`
  width: 100%;
  background: #676773;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #17171a;
`

const Input = ({ value, onInput, label, name, placeholder }: InputProps) => {
  const handleInput = (e: InputEvent) => {
    const inputElement = e.currentTarget as HTMLInputElement
    onInput(inputElement.value)
  }

  return (
    <div
      class={css`
        width: 100%;
      `}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <input
        class={styleInput}
        placeholder={placeholder}
        type="text"
        name={name}
        value={value}
        onInput={handleInput}
      />
    </div>
  )
}

export default Input
