import { message } from 'ant-design-vue'
import { Result } from './transformYAPI'

/**
 * @description: 获取数据类型
 * @param {Result} data
 * @return {string}
 */
const type = (data: Result): string => {
  return Object.prototype.toString.call(data).toLowerCase().replace('[object ', '').replace(']', '')
}

/**
 * @description: 将 JS 对象 处理为 type object
 * @param {Result} data
 * @return {*}
 */
export default (data: Result | Result[]): Result => {
  const result: Result = {}
  if (type(data) === 'array') {
    message.info('暂不支持此数据类型')
    return []
  }
  const transform = (data: Result, result: Result): void => {
    for (const prop in data) {
      if (type(data[prop]) === 'object') {
        result[prop] = {}
        transform(data[prop], result[prop])
        continue
      }
      if (type(data[prop]) === 'array') {
        if (type(data[prop][0]) === 'object') {
          result[prop] = [{}]
          transform(data[prop][0], result[prop][0])
          continue
        }
        if (type(data[prop][0]) === 'array') {
          result[prop] = [[]]
          transform(data[prop][0], result[prop][0])
          continue
        }
        result[prop] = [type(data[prop][0])]
        continue
      }
      result[prop] = type(data[prop])
    }
  }
  transform(data, result)
  return result
}
