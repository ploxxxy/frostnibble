import { signal } from '@preact/signals'
import BufReader from './reader'
import BufWriter from './writer'
import { crc32 } from './crc32'
import { swapEndian } from './utils'

const FILE_SIGNATURE = 6001977056592872006n

class Entry {
  private _type = signal<number>(0)
  private _key = signal<string>('')
  private _value = signal<Uint8Array>(new Uint8Array(0))

  constructor(type: number, key: string, value: Uint8Array) {
    this._type.value = type
    this._key.value = key
    this._value.value = value
  }

  static read(reader: BufReader) {
    const type = reader.getUint32()
    const key = reader.getString()
    const value = reader.getBinary()

    return new Entry(type, key, value)
  }

  write(writer: BufWriter) {
    writer.writeUint32(this._type.value)
    writer.writeString(this._key.value)
    writer.writeBinary(this._value.value)
  }

  get value() {
    if (this._type.value === 5) {
      return this._value.value
    } else {
      return new TextDecoder().decode(this._value.value).slice(0, -1)
    }
  }

  set value(value: string | Uint8Array) {
    if (typeof value === 'string') {
      this._value.value = new TextEncoder().encode(value + '\0')
    } else {
      this._value.value = value
    }
  }

  get key() {
    return this._key.value.slice(0, -1)
  }

  set key(key: string) {
    this._key.value = key + '\0'
  }

  get type() {
    return this._type.value
  }

  set type(type: number) {
    this._type.value = type
  }

  get typeString() {
    switch (this._type.value) {
      case 1:
        return 'Float'
      case 2:
        return 'Integer'
      case 3:
        return 'Long'
      case 4:
        return 'String'
      case 5:
        return 'Binary'
      default:
        return 'Unknown'
    }
  }
}

class SaveFile {
  entryList: Entry[][]
  private version: number
  private headerSize: number
  private bodySize: number

  constructor(file: ArrayBuffer) {
    const reader = new BufReader(file)

    const magic = reader.getUint64()
    if (magic !== FILE_SIGNATURE) {
      throw new Error('Invalid file signature')
    }

    this.version = reader.getUint16()
    this.headerSize = reader.getUint32()
    this.bodySize = reader.getUint32()
    const headerHash = reader.getUint32()
    const headerEntries = reader.getUint32()
    const bodyHash = reader.getUint32()

    console.log({
      magic,
      version: this.version,
      headerSize: this.headerSize,
      bodySize: this.bodySize,
      headerHash,
      headerEntries,
      bodyHash,
    })

    this.entryList = Array.from({ length: headerEntries }, () => [])

    for (let i = 0; i < headerEntries; i++) {
      const entriesSize = reader.getUint32()

      for (let j = 0; j < entriesSize; j++) {
        this.entryList[i].push(Entry.read(reader))
      }
    }
  }

  write() {
    const futureSize =
      8 /* magic */ +
      2 /* version */ +
      4 /* headerSize */ +
      4 /* bodySize */ +
      4 /* headerHash */ +
      4 /* headerEntries */ +
      this.bodySize

    const writer = new BufWriter(futureSize)

    writer.offset = 0x1e

    for (const entries of this.entryList) {
      writer.writeUint32(entries.length)

      for (const entry of entries) {
        entry.write(writer)
      }
    }

    // TODO: create separate buffers for values

    const bodyHash = crc32(new Uint8Array(writer.getBuffer().slice(0x1e)))
    const headerHash = crc32(new Uint8Array([this.entryList.length, 0, 0, 0]))

    writer.offset = 0
    writer.writeUint64(FILE_SIGNATURE)
    writer.writeUint16(this.version)
    writer.writeUint32(this.headerSize)
    writer.writeUint32(this.bodySize)
    writer.writeUint32(headerHash)
    writer.writeUint32(this.entryList.length)
    writer.writeUint32(swapEndian(bodyHash))

    return writer.getBuffer()
  }

  download() {
    const blob = new Blob([this.write()], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'PROF_SAVE'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }
}

export default SaveFile
export { Entry }
