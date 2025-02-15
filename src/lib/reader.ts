export default class BufReader {
  private dataView: DataView
  offset = 0

  constructor(buffer: ArrayBuffer) {
    this.dataView = new DataView(buffer)
  }

  getUint16() {
    const value = this.dataView.getUint16(this.offset, true)
    this.offset += 2

    return value
  }

  getUint32() {
    const value = this.dataView.getUint32(this.offset, true)
    this.offset += 4

    return value
  }

  getUint64() {
    const value = this.dataView.getBigUint64(this.offset, true)
    this.offset += 8

    return value
  }

  getString() {
    const length = this.getUint32()
    const value = new TextDecoder().decode(
      new Uint8Array(this.dataView.buffer, this.offset, length)
    )
    this.offset += length

    return value
  }

  getBinary() {
    const length = this.getUint32()
    const value = new Uint8Array(this.dataView.buffer, this.offset, length)
    this.offset += length

    return value
  }
}
