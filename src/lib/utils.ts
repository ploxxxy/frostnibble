function swapEndian(value: number): number {
  return (
    ((value >>> 24) & 0xff) |
    ((value >>> 8) & 0xff00) |
    ((value << 8) & 0xff0000) |
    ((value << 24) & 0xff000000)
  )
}

export { swapEndian }
