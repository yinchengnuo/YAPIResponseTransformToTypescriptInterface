import { Config } from './transform'

/**
 * @description: JSON.stringify 格式化 美化 接口展示
 * @param {object} data
 * @param {Config} config
 * @return {*}
 */
export default (data: object | string, config: Config): string => {
  data = JSON.stringify(data, null, config.tabSize)
  data = data.replaceAll('"', '')
  data = data.replaceAll(',', '')
  data = data.replace(/\[\s+/g, '')
  data = data.replace(/\s+\]/g, '[]')
  data = data.replace(/(?<=\n)\s+/g, ($: string) => {
    if ($.length === config.tabSize) {
      return $
    } else {
      return Array($.length / 2 + config.tabSize)
        .fill(' ')
        .join('')
    }
  })
  return data
}
