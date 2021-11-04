/**
 * @description: 检查粘贴文本是否为 json
 * @param {string} data
 * @return {boolean}
 * @author: 尹成诺
 */
export default (data: string): boolean => {
  try {
    data = JSON.parse(data)
  } catch (error) {
    return false
  }
  return true
}
