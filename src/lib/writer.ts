export default class BufWriter {
  private dataView: DataView
  private buffer: Uint8Array
  offset = 0

  constructor(size: number) {
    this.buffer = new Uint8Array(size)
    this.dataView = new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength
    )
  }

  writeUint16(value: number) {
    this.dataView.setUint16(this.offset, value, true)
    this.offset += 2
  }

  writeUint32(value: number) {
    this.dataView.setUint32(this.offset, value, true)
    this.offset += 4
  }

  writeUint64(value: bigint) {
    this.dataView.setBigUint64(this.offset, value, true)
    this.offset += 8
  }

  writeString(value: string) {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(value)

    this.writeUint32(bytes.length)
    new Uint8Array(this.dataView.buffer).set(bytes, this.offset)
    this.offset += bytes.length
  }

  writeBinary(value: Uint8Array) {
    this.writeUint32(value.length)
    new Uint8Array(this.dataView.buffer).set(value, this.offset)
    this.offset += value.length
  }

  getBuffer() {
    return this.buffer
  }
}
