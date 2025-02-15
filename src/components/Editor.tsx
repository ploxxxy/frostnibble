import { useEffect, useState } from 'preact/hooks'
import { activeEntrySignal } from '../app'
import useDebounce from '../hooks/useDebounce'
import css from '../lib/css'
import DefaultEditor from './editors/DefaultEditor'
import HexEditor from './editors/HexEditor'
import PlayerTagsEditor from './editors/PlayerTagEditor'
import Input from './ui/Input'

const styleEditor = css`
  background: #383840;
  padding: 1rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  @media (max-width: 1000px) {
    width: 100%;
    max-height: 50%;
  }
`

const styleInput = css`
  width: 100%;
  background: #676773;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #17171a;
`

const Editor = () => {
  const activeEntry = activeEntrySignal.value
  if (!activeEntry) {
    return (
      <div class={styleEditor}>
        <span>Click on an entry to start editing</span>
      </div>
    )
  }

  const handleTypeSelect = (e: Event) => {
    const target = e.target as HTMLSelectElement
    const type = parseInt(target.selectedOptions[0].value)

    activeEntry.type = type
  }

  const [newKey, setNewKey] = useState(activeEntry.key)
  const debouncedKey = useDebounce(newKey, 300)

  useEffect(() => {
    setNewKey(activeEntry.key)
  }, [activeEntry])

  useEffect(() => {
    if (debouncedKey === activeEntry.key) return

    activeEntry.key = debouncedKey
  }, [debouncedKey])

  const handleKeyInput = (e: string) => {
    setNewKey(e)
  }

  const getEditorForThisType = () => {
    if (activeEntry.type === 5) return <HexEditor entry={activeEntry} />
    if (activeEntry.key === '__playerTag')
      return <PlayerTagsEditor entry={activeEntry} />
    return <DefaultEditor entry={activeEntry} />
  }

  return (
    <div class={styleEditor}>
      <div>
        <label htmlFor="type">Select entry type</label>
        <select
          class={styleInput}
          onChange={handleTypeSelect}
          name="type"
          id="type"
          value={activeEntry.type}
        >
          <option data-type="Float" value="1">
            Float
          </option>
          <option data-type="Integer" value="2">
            Integer
          </option>
          <option data-type="Long" value="3">
            Long
          </option>
          <option data-type="String" value="4">
            String
          </option>
          <option data-type="Binary" value="5">
            Binary
          </option>
        </select>
      </div>

      <Input label="Key" value={newKey} name="key" onInput={handleKeyInput} />

      <div
        class={css`
          max-height: 100%;
          overflow-y: auto;
          padding: 0.5rem;
          background: #232327;
          border-radius: 0.25rem;
        `}
      >
        {getEditorForThisType()}
      </div>
    </div>
  )
}

export default Editor
