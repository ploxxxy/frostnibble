import { ComponentChildren } from 'preact'
import css from '../../lib/css'

interface ButtonProps {
  onClick: () => void
  children: ComponentChildren
  class?: string
}

const styleButton = css`
  background: #dadada;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #17171a;
  cursor: pointer;
  &:active {
    background: #bfbfbf;
  }
`

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button class={styleButton} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
