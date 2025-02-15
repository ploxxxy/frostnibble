import { signal } from '@preact/signals'
import { useMemo, useState } from 'preact/hooks'
import Editor from './components/Editor'
import EntryList from './components/EntryList'
import TopBar, { type FilterOptions } from './components/TopBar'
import useDebounce from './hooks/useDebounce'
import css from './lib/css'
import SaveFile, { Entry } from './lib/save-file'

const styleContainer = css`
  display: flex;
  height: 100vh;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

const styleApp = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  height: 100%;
  width: 50%;
  @media (max-width: 1000px) {
    height: 75%;
    width: 100%;
  }
`

const styleTopBar = css`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  background: #18181a;
  color: white;
  position: sticky;
  top: -1rem;
  gap: 1rem;
`

export const activeEntrySignal = signal<Entry | null>(null)

export function App() {
  const [file, setFile] = useState<SaveFile | null>(null)

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    hideEmpty: false,
  })

  const filterEntryList = useMemo(() => {
    if (!file) return []

    const lowerCaseQuery = debouncedQuery.toLowerCase()

    return file.entryList
      .map((entries) => {
        return entries.filter((entry) => {
          const lowerCaseKey = entry.key.toLowerCase()

          return (
            lowerCaseKey.includes(lowerCaseQuery) ||
            (entry.type !== 5 &&
              (entry.value as string).toLowerCase().includes(lowerCaseQuery))
          )
        })
      })
      .filter((entryList) => {
        if (filterOptions.hideEmpty) {
          return entryList.some((entry) => entry.value)
        }

        return true
      })
  }, [file, filterOptions, debouncedQuery])

  function onDrop(e: DragEvent) {
    e.preventDefault()

    const file = e.dataTransfer?.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const save = new SaveFile(reader.result as ArrayBuffer)
      setFile(save)
    }

    reader.readAsArrayBuffer(file)
  }

  function setDefaultProfile() {
    fetch('assets/PROF_SAVE').then(async (res) => {
      const save = new SaveFile(await res.arrayBuffer())
      setFile(save)
    })
  }

  return (
    <div class={styleContainer}>
      <div
        class={styleApp}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h1>Frostbite Profile Options Editor</h1>
        {file && (
          <>
            <div class={styleTopBar}>
              <TopBar
                onInput={setQuery}
                onOptions={setFilterOptions}
                onExport={() => file.download()}
              />
            </div>
            {filterEntryList.map((entries, i) => (
              <EntryList key={i} entries={entries} />
            ))}
          </>
        )}
        {!file && (
          <p>
            Drag & Drop your Profile Options file or
            <button
              class={css`
                text-decoration: underline;
                cursor: pointer;
                border: none;
                background: none;
                color: #b1edff;
              `}
              onClick={setDefaultProfile}
            >
              use the default one
            </button>
          </p>
        )}
      </div>
      <Editor />
    </div>
  )
}
