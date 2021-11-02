export default (type: any): string => {
  if (typeof type === 'object') {
    // return type[0] === 'null' ? 'any' : type[0]
    return type.reduce((t: string, e: string) => t + (t ? ' | ' : '') + e, '')
  }
  // return type === 'null' ? 'any' : type
  return type
}
