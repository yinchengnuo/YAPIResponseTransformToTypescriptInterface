import { JsonSchema, Config } from './transform'

/**
 * @description: 根据配置处理 type 转换为 null、加注释等
 * @param {string} type
 * @param {JsonSchema} item
 * @param {Config} config
 * @return {string}
 */
const setConfig = (type: string, item: JsonSchema, config: Config): string => {
  if (config.replaceNull && type === 'null') {
    type = 'any'
  }
  if (config.showDescription && item.description) {
    type += ` // ${item.description}`
  }
  return type
}

/**
 * @description: 处理 schema json type 为 数组 和 字符串两种情况
 * @param {JsonSchema} item
 * @param {Config} config
 * @return {string}
 */
const type = (item: JsonSchema, config: Config): string => {
  if (typeof item.type === 'object') {
    return setConfig(
      item.type.reduce((types: string, type: string) => types + (types ? ' | ' : '') + type, ''),
      item,
      config
    )
  } else {
    return setConfig(item.type, item, config)
  }
}

export interface Result {
  [_: string]: any;
}

interface Properties {
  [_: string]: JsonSchema;
}

/**
 * @description: 将 schema json 处理为 type object
 * @param {JsonSchema} data
 * @param {Config} config
 * @return {object}
 */
export default (data: JsonSchema, config: Config): object => {
  const result: Result = {}
  const transform = (data: Properties, result: Result): void => {
    for (const prop in data) {
      if (type(data[prop], config).startsWith('object')) {
        result[prop] = {}
        transform(data[prop].properties, result[prop])
        continue
      }
      if (type(data[prop], config).startsWith('array')) {
        if (type(data[prop].items, config).startsWith('object')) {
          result[prop] = [{}]
          transform(data[prop].items.properties, result[prop][0])
          continue
        }
        if (type(data[prop].items, config).startsWith('array')) {
          throw new Error('数据中存在多维数组，暂不支持转换')
        }
        result[prop] = [type(data[prop].items, config)]
        continue
      }
      result[prop] = type(data[prop], config)
    }
  }
  transform(data.properties, result)
  return result
}
