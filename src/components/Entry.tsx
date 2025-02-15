import { activeEntrySignal } from '../app'
import css from '../lib/css'
import type { Entry as IEntry } from '../lib/save-file'

const styleEntry = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 5rem;
  cursor: pointer;
  &:hover {
    background: color-mix(in srgb, currentColor 20%, transparent);
  }
`

const styleKey = css`
  color: #b1b1b1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Entry = ({ entry }: { entry: IEntry }) => {
  let value: string | undefined = undefined

  if (entry.type === 5) {
    value = entry.value.length + ' bytes'
  } else {
    value = entry.value as string
  }

  const handleClick = () => {
    activeEntrySignal.value = entry
  }

  return (
    <div data-type={entry.typeString} class={styleEntry} onClick={handleClick}>
      <span class={styleKey}>{entry.key}</span>
      {value && (
        <span
          class={css`
            margin-left: auto;
          `}
        >
          {value}
        </span>
      )}
    </div>
  )
}

export default Entry
