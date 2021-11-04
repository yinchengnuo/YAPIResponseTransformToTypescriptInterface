## 背景

随着 Typescript 在前端团队的逐步落地，越来越多的产品前端使用 Typescript 进行开发。

Typescript 作为 Javascript 的超集，补起了 JavaScript 的类型短板。同时配合相关包和插件的使用，预编译类型检查和代码提示极大的提升了开发效率和代码产品质量。

在使用 Typescript 的过程中，我们要求所有的变量声明都必须要有确定的类型声明，不使用 any 作为作为变量类型。

但是在实际开发过程中，我们经常会遇到变量数据结构庞大且复杂的情况，比如大型组件内部状态或表示复杂的后端接口返回数据等。

在这种情况下，使用 Typescript 类型系统手动为每个字段定义类型是不现实的。

为了解决这个问题，就有了 [YAPIResponseTransformToTypescriptInterface](http://10.106.16.87:50001/app/yapi/)。

## 如何使用

### 处理 JSObject

如在代码中有如下对象：

```js
const state = {
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
```

选中对象：

```js
{
  a: 1,
  // ...
}
```

复制后进入 [http://10.106.16.87:50001/app/yapi/](http://10.106.16.87:50001/app/yapi/) 点击 粘贴 按钮。

即可在 输出 Typescript Interface：看到：

```ts
interface Interface {
  a: number
  b: string
  c: boolean
  d: string[]
  f: {
    fa: number
    fb: string
    fc: boolean
  }
  g: {
     ga: number
     gb: boolean
    }[]
  h: number
     number
     number[][]
}
```

点击 复制 按钮，将接口粘贴至代码即可：

```ts
interface Interface {
  a: number
  b: string
  c: boolean
  d: string[]
  f: {
    fa: number
    fb: string
    fc: boolean
  }
  g: {
     ga: number
     gb: boolean
    }[]
  h: number
     number
     number[][]
}
const state: Interface = {
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
```

### 处理后端返回数据

打开 YAPI 接口文档，找到相应接口。

点击**编辑**。

向下滚动找到**返回数据设置**。

点击**RAW**。

选中 textarea 中的文本并复制：

```
{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"status":{"type":"number"},"message":{"type":"null"},"data":{"type":"object","properties":{"id":{"type":"string"},"templateUtilityId":{"type":"string"},"title":{"type":"string"},"type":{"type":"number"},"appraisalCycle":{"type":"string"},"deptName":{"type":"string"},"deptId":{"type":"string"},"state":{"type":"number"},"crtName":{"type":"string"},"crtTime":{"type":"string"},"crtJobNo":{"type":"string"},"updTime":{"type":"string"},"updName":{"type":"string"},"updJobNo":{"type":"null"},"selfScore":{"type":"null"},"teamScore":{"type":"null"},"selfEvaluate":{"type":"null"},"managerEvaluate":{"type":"null"},"checkTime":{"type":"null"},"checkJobNo":{"type":"null"},"checkName":{"type":"null"},"relationList":{"type":"null"},"modularList":{"type":"array","items":{"type":"object","properties":{"id":{"type":"number"},"templateId":{"type":"null"},"templateUtilityId":{"type":"null"},"title":{"type":"string"},"weight":{"type":["number","null"]},"dimensionList":{"type":"array","items":{"type":"object","properties":{"id":{"type":"number"},"pbcId":{"type":"string"},"templateUtilityId":{"type":"string"},"modularId":{"type":"number"},"dimensionId":{"type":"null"},"title":{"type":"string"},"weight":{"type":"null"},"type":{"type":"null"},"isCustom":{"type":"number"},"complete":{"type":"null"},"selfScore":{"type":"null"},"teamScore":{"type":"null"},"customList":{"type":"array","items":{"type":"object","properties":{"id":{"type":"number"},"pbcId":{"type":"string"},"modularId":{"type":"number"},"dimensionId":{"type":"number"},"type":{"type":"number"},"title":{"type":"string"},"content":{"type":"string"},"templateUtilityId":{"type":"string"},"targetCustomUtilityId":{"type":"number"}},"required":["id","pbcId","modularId","dimensionId","type","title","content","templateUtilityId","targetCustomUtilityId"]}},"targetList":{"type":"array","items":{"type":"string"}}},"required":["id","pbcId","templateUtilityId","modularId","dimensionId","title","weight","type","isCustom","complete","selfScore","teamScore","customList","targetList"]}}},"required":["id","templateId","templateUtilityId","title","weight","dimensionList"]}}}},"rel":{"type":"boolean"}}}
```

进入 [http://10.106.16.87:50001/app/yapi/](http://10.106.16.87:50001/app/yapi/) 点击 粘贴 按钮。

即可在 输出 Typescript Interface：看到：

```ts
interface Interface {
  status: number
  message: any
  data: {
    id: string
    templateUtilityId: string
    title: string
    type: number
    appraisalCycle: string
    deptName: string
    deptId: string
    state: number
    crtName: string
    crtTime: string
    crtJobNo: string
    updTime: string
    updName: string
    updJobNo: any
    selfScore: any
    teamScore: any
    selfEvaluate: any
    managerEvaluate: any
    checkTime: any
    checkJobNo: any
    checkName: any
    relationList: any
    modularList: {
      id: number
      templateId: any
      templateUtilityId: any
      title: string
      weight: number | null
      dimensionList: {
        id: number
        pbcId: string
        templateUtilityId: string
        modularId: number
        dimensionId: any
        title: string
        weight: any
        type: any
        isCustom: number
        complete: any
        selfScore: any
        teamScore: any
        customList: {
          id: number
          pbcId: string
          modularId: number
          dimensionId: number
          type: number
          title: string
          content: string
          templateUtilityId: string
          targetCustomUtilityId: number
         }[]
        targetList: string[]
       }[]
     }[]
  }
  rel: boolean
}
```

粘贴至代码即可：

```js
interface Interface {
  // ...
}
API.get(/**...**/).then((res: Interface) => {
  // ....
})
```

## 注意事项

1、仅支持 JSON 格式或 JSObject 格式（ { ... } ）文本

2、不对类型属性是否可选进行处理

