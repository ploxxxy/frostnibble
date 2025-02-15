import css from '../../lib/css'
import type { Entry } from '../../lib/save-file'

const styleHexEditor = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: monospace;
`

const HexEditor = ({ entry }: { entry: Entry }) => {
  return (
    <>
      <span>Binary editing is not supported yet!</span>
      <div class={styleHexEditor}>
        {Array.from(entry.value as Uint8Array)
          .map((e) => e.toString(16))
          .map((e) => (
            <span>{e.padStart(2, '0')}</span>
          ))}
      </div>
    </>
  )
}

export default HexEditor
