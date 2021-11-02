<template>
  <div class="PageIndex h100">
    <a-page-header :avatar="{ src: Avatar }">
      <template #title> YAPI Response 转 Typescript Interface </template>
      <template #subTitle>
        <a-button type="link" target="_blank" href="http://10.106.11.64/yinchengnuo/yapiresponsetransformtotypescriptinterface" block>Gitlab</a-button>
      </template>
      <template #tags>
        <a-tag v-for="item in tags" :key="item.value" :color="item.color">{{ item.value }}</a-tag>
      </template>
      <template #extra>
        <a-tooltip>
          <template #title>如何使用？</template>
          <QuestionCircleOutlined class="how_to_use" />
        </a-tooltip>
      </template>
      <a-row>
        <div class="flex1 flex flex_sb">
          <h3>输入YAPI Response（schema json）：</h3>
          <a-space>
            <a-button v-if="inputDom" @click="clear">清除</a-button>
            <a-button type="primary" @click="paste">粘贴</a-button>
          </a-space>
        </div>
        <a-divider class="h100" type="vertical" />
        <div class="flex1 flex flex_sb">
          <h3>输出 Typescript Interface：</h3>
          <a-button type="primary" @click="copy">复制</a-button>
        </div>
      </a-row>
      <template #footer>
        <a-row>
          <pre v-html="inputDom" class="editor flex1" />
          <a-divider class="h100" type="vertical" />
          <pre v-html="outputDom" class="editor flex1" />
        </a-row>
      </template>
    </a-page-header>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'

// import data from './data.json'
import check from '@/utils/check'
import transform from '@/utils/transform'
import stringify from '@/utils/stringify'

import Avatar from '@/assets/my.png'

import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import { message } from 'ant-design-vue'

const tags = [
  { value: 'Vite', color: 'blue' },
  { value: 'Vue3', color: 'red' },
  { value: 'Typescript', color: 'green' },
  { value: 'ESLint', color: 'orange' },
  { value: 'Prettier', color: 'grey' }
]

const inputDom: Ref<string> = ref('')
const outputDom: Ref<string> = ref('')

// 粘贴 json
const paste = (): void => {
  navigator.clipboard
    .readText()
    .then((text: string) => {
      if (check(text)) {
        inputDom.value = JSON.stringify(transform(JSON.parse(text)), null, 2)
        outputDom.value = 'interface Interface' + stringify(transform(JSON.parse(text)))
        message.success('转换成功')
      } else {
        inputDom.value = text
        message.info('请粘贴 schema json 格式文本')
      }
    })
    .catch(() => {
      message.destroy()
      message.error('粘贴失败，请允许粘贴')
    })
}
// 清除
const clear = () => {
  inputDom.value = outputDom.value = ''
}
// 复制 interface
const copy = (): void => {
  if (outputDom.value) {
    navigator.clipboard.writeText(outputDom.value)
    message.success('复制成功')
  } else {
    message.info('输出区域无数据')
  }
}
</script>

<style lang="scss" scoped>
.PageIndex {
  .how_to_use {
    font-size: 24px;
    vertical-align: middle;
  }

  .editor {
    padding: 8px;
    overflow-y: auto;
    border-radius: 6px;
    box-sizing: border-box;
    height: calc(100vh - 139px);
    border: 1px solid #cac9c9;
  }
}
</style>
