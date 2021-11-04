import format from './format'
import transformJS from './transformJS'
import transformYAPI from './transformYAPI'

export interface JsonSchema {
  $schema: string;
  items: JsonSchema;
  description: string;
  type: string | string[];
  properties: {
    [_: string]: JsonSchema;
  };
}

export interface Config {
  tabSize: number;
  replaceNull: boolean;
  interfaceName: string;
  showDescription: boolean;
}

/**
 * @description: 根据 json 类型分发算法
 * @param {string} text
 * @param {Config} config
 * @return {string}
 */
export default (text: string, config: Config): string => {
  const data = JSON.parse(text) as JsonSchema
  if (data.type === 'object' && data.$schema === 'http://json-schema.org/draft-04/schema#' && data.properties && Reflect.ownKeys(data.properties).length) {
    return `interface ${config.interfaceName} ${format(transformYAPI(data, config), config)}`
  } else {
    return `interface ${config.interfaceName} ${format(transformJS(data as object), config)}`
  }
}
