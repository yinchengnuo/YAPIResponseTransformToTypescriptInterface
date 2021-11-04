export const JSObject = `{
  a: 1,
  b: 'b',
  c: false,
  d: ['d', 'd', 'd'],
  f: {
    fa: 1,
    fb: 'b',
    fc: true
  },
  g: [
    {
      ga: 1,
      gb: false
    }
  ],
  h: [
    [1, 1, 1],
    [
      {
        h1: false,
        h2: 'h2'
      }
    ]
  ]
}
`

export const SchemaJson = `{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "code": { "type": "number", "description": "响应码" },
    "data": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "assignStatus": { "type": ["number", "string"], "description": "车辆指派状态 0：未指派 ，1：已指派" },
              "carNumber": { "type": "string", "description": "车牌号" },
              "id": { "type": "string", "description": "车辆ID" },
              "vehicleTypeCode": { "type": "null", "description": "车辆类型编码" }
            },
            "required": ["assignStatus", "carNumber", "id", "vehicleTypeCode"]
          }
        },
        "total": { "type": "number", "description": "总记录数" }
      },
      "description": "车辆列表"
    },
    "msg": { "type": "string", "description": "响应描述" },
    "success": { "type": "boolean", "description": "执行结果" }
  }
}
`
