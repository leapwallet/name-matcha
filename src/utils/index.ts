export const hexToDecimal = (hexString: string): string => {
  if (hexString.startsWith('0x')) {
    return parseInt(hexString, 16).toString()
  }
  return hexString
}
