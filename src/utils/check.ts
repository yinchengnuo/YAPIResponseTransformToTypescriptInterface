export default (data: any): boolean => {
  if (data.$schema === 'http://json-schema.org/draft-04/schema#') {
    return true
  }
  return false
}
