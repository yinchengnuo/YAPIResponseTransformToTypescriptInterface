<template>
  <div class="PageIndex h100">
    <a-page-header :avatar="{ src: Avatar }">
      <template #title> YAPI Response 转 Typescript Interface </template>
      <template #subTitle>
        <a-button type="link" target="_blank" href="http://10.106.11.64/yinchengnuo/yapiresponsetransformtotypescriptinterface">Gitlab</a-button>
      </template>
      <template #tags>
        <a-tag v-for="item in tags" :key="item.value" :color="item.color">{{ item.value }}</a-tag>
      </template>
      <template #extra>
        <a-button type="link" @click="example">查看示例</a-button>
        <a-tooltip>
          <template #title>如何使用？</template>
          <a-button type="text" target="_blank" href="http://10.106.11.64/yinchengnuo/yapiresponsetransformtotypescriptinterface">
            <QuestionCircleOutlined class="how_to_use" />
          </a-button>
        </a-tooltip>
      </template>
      <a-row>
        <div class="flex1 flex flex_sb">
          <h3>输入YAPI Response（SchemaJson/JSObject）：</h3>
          <a-space>
            <a-tooltip>
              <template #title>是否显示 description 为接口注释</template>
              <a-switch v-model:checked="config.showDescription" checkedChildren="是" unCheckedChildren="否" />
            </a-tooltip>
            <a-tooltip>
              <template #title>是否替换 type null 为 any</template>
              <a-switch v-model:checked="config.replaceNull" checkedChildren="是" unCheckedChildren="否" />
            </a-tooltip>
            <a-button v-if="inputDom" @click="inputDom = ''">清除</a-button>
            <a-button type="primary" @click="paste">粘贴</a-button>
          </a-space>
        </div>
        <a-divider class="h100" type="vertical" />
        <div class="flex1 flex flex_sb">
          <h3>输出 Typescript Interface：</h3>
          <a-space>
            <a-tooltip>
              <template #title>Interface Name</template>
              <a-input v-model:value="config.interfaceName" allowClear />
            </a-tooltip>
            <a-tooltip>
              <template #title>TabSize</template>
              <a-switch v-model:checked="config.tabSize" :checkedValue="2" :unCheckedValue="4" checkedChildren="2" unCheckedChildren="4" />
            </a-tooltip>
            <a-button type="primary" @click="copy">复制</a-button>
          </a-space>
        </div>
      </a-row>
      <template #footer>
        <a-row>
          <pre v-html="inputDom" class="editor input flex1" :class="{ value: inputDom }" />
          <a-divider class="h100" type="vertical" />
          <pre v-html="outputDom" class="editor output flex1" :class="{ value: outputDom }" />
        </a-row>
      </template>
    </a-page-header>
  </div>
</template>

<script setup lang="ts">
import data from './data.json'
import Avatar from '@/assets/my.png'
import { ref, Ref, reactive, computed, ComputedRef } from 'vue'

import { message } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import check from '@/utils/check'
import transform, { Config } from '@/utils/transform'

message.config({ top: '300px' })

// 编译配置
const config: Config = reactive({
  tabSize: 2, // tabSize
  replaceNull: true, // 是否替换 null 为 any
  showDescription: true, // 是否显示 description 为接口注释
  interfaceName: 'Interface' // Interface Name
})

// 输入的 JSON
const inputDom: Ref<string> = ref('')

// 输出的 JOSN
const outputDom: ComputedRef<string> = computed((): string => {
  if (inputDom.value && check(inputDom.value)) {
    return transform(inputDom.value, config)
  }
  return ''
})

// 粘贴 json
const paste = (): void => {
  // 从剪切板读取数据
  navigator.clipboard
    .readText()
    .then((text: string) => {
      text = text
        .trim()
        .replaceAll("'", '"')
        .replace(/\w+(?=\s*:)/g, '"$&"')
      // 检查数据是否为 json
      if (check(text)) {
        inputDom.value = JSON.stringify(JSON.parse(text), null, 2)
      } else {
        inputDom.value = text
        message.info('无法转换，请粘贴 Schema JSON 格式文本')
      }
    })
    .catch(() => message.error('粘贴失败，请允许应用访问剪切板'))
}

// 复制 interface
const copy = (): void => {
  if (outputDom.value) {
    navigator.clipboard
      .writeText(outputDom.value)
      .then(() => message.success('复制成功'))
      .catch(() => message.error('复制失败，请允许应用访问剪切板'))
  } else {
    message.info('输出无数据')
  }
}

// 点击查看示例
const example = () => {
  inputDom.value = JSON.stringify(data, null, 2)
}

// 标签数据
const tags = [
  { value: 'pnpm', color: 'pink' },
  { value: 'vite', color: 'red' },
  { value: 'vue3', color: 'orange' },
  { value: 'typescript', color: 'green' },
  { value: 'ESLint', color: 'cyan' },
  { value: 'prettier', color: 'blue' },
  { value: 'volar', color: 'purple' },
  { value: 'sass', color: 'gold' },
  { value: 'husky', color: 'yellow' },
  { value: 'lint-staged', color: 'blue' }
]
</script>

<style lang="scss" scoped>
.PageIndex {
  .how_to_use {
    font-size: 24px;
    vertical-align: middle;
  }
  .editor {
    padding: 8px;
    color: #000;
    overflow-y: auto;
    font-weight: bold;
    position: relative;
    border-radius: 6px;
    box-sizing: border-box;
    height: calc(100vh - 139px);
    border: 1px solid #cac9c9;
    &.value {
      &::after {
        display: none;
      }
    }
    &::after {
      top: 8px;
      left: 8px;
      color: #cac9c9;
      font-style: italic;
      position: absolute;
    }
    &.input {
      &::after {
        content: "请粘贴 SchemaJson / JSObject";
      }
    }
    &.output {
      &::after {
        content: "无输出...";
      }
    }
  }
}
</style>
