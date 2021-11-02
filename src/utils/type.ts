export default (type: any): string => {
  if (typeof type === 'object') {
    return type[0] === 'null' ? 'any' : type[0]
  }
  return type === 'null' ? 'any' : type
}
