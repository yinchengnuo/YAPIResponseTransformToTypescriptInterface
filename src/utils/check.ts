/*
 * @Description: 检查数据是否为 schema json
 * @Autor: 尹成诺
 */
export default (data: any): boolean => {
  try {
    data = JSON.parse(data)
  } catch (error) {
    return false
  }
  if (data.type === 'object' && data.$schema === 'http://json-schema.org/draft-04/schema#' && data.properties && Reflect.ownKeys(data.properties).length) {
    return true
  }
  return false
}
