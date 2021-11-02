export default (data: any): boolean => {
  if (
    data.type === 'object' &&
    data.$schema === 'http://json-schema.org/draft-04/schema#' &&
    data.properties &&
    Reflect.ownKeys(data.properties).length
  ) {
    return true
  }
  return false
}
