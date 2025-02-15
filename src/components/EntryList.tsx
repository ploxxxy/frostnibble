import { memo } from 'preact/compat'
import css from '../lib/css'
import { Entry as IEntry } from '../lib/save-file'
import Entry from './Entry'

const styleEntryList = css`
  background: #232327;
  font-family: monospace;
  padding: 1rem 0;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  & > * {
    padding: 0.1rem 1rem;
  }
`

const EntryList = ({ entries }: { entries: IEntry[] }) => {
  return (
    <div class={styleEntryList}>
      {entries.length === 0 && <span>There are no entries in this list</span>}
      {entries.map((entry) => (
        <Entry key={entry.key} entry={entry} />
      ))}
    </div>
  )
}

export default memo(EntryList)
