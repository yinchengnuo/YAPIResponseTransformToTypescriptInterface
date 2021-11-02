import type from './type'

export default ({ properties }: any): any => {
  const result = {}
  const transform = (data: any, result: any): void => {
    for (const prop in data) {
      if (type(data[prop].type) === 'object') {
        result[prop] = {}
        transform(data[prop].properties, result[prop])
        continue
      }
      if (type(data[prop].type) === 'array') {
        if (type(data[prop].items.type) === 'object') {
          result[prop] = [{}]
          transform(data[prop].items.properties, result[prop][0])
          continue
        }
        if (type(data[prop].items.type) === 'array') {
          result[prop] = [[]]
          transform(data[prop].items.properties, result[prop][0])
          continue
        }
        result[prop] = [type(data[prop].items.type)]
        continue
      }
      result[prop] = type(data[prop].type)
    }
  }
  transform(properties, result)
  return result
}
