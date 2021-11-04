import { Config } from './transform'

/**
 * @description: JSON.stringify 格式化 对象
 * @param {object} data
 * @param {Config} config
 * @return {*}
 */
export default (data: object, config: Config): string => {
  return JSON.stringify(data, null, config.tabSize).replaceAll('"', '').replaceAll(',', '').replace(/\[\s+/g, '').replace(/\s+\]/g, '[]')
}
