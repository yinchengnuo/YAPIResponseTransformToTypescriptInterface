export default (interfac: object): string => {
  return JSON.stringify(interfac, null, 2).replaceAll('"', '').replace(/\[\s+/g, '').replace(/\s+\]/g, '[]')
}
