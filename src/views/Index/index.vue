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
        <a-dropdown>
          <a-button type="link">查看示例</a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="handle(JSObject)"> JSObject </a-menu-item>
              <a-menu-item @click="handle(SchemaJson)"> SchemaJson </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-tooltip>
          <template #title>如何使用？</template>
          <a-button type="text" target="_blank" href="http://10.106.16.87:50001/pages/1d9c14">
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
          <pre v-html="inputDom" class="editor input flex1" :class="{ value: inputDom }" @click="click" />
          <a-divider class="h100" type="vertical" />
          <pre v-html="outputDom" class="editor output flex1" :class="{ value: outputDom }" />
        </a-row>
      </template>
    </a-page-header>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/assets/my.png'
import { JSObject, SchemaJson } from './data'

import { ref, Ref, reactive, computed, ComputedRef } from 'vue'

import { message } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import transform, { Config } from '@/utils/transform'

message.config({ top: 'calc(50vh - 30px)' })

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
  if (inputDom.value) {
    try {
      return transform(inputDom.value, config)
    } catch (error) {
      message.destroy()
      message.info('无法转换')
      return ''
    }
  }
  return ''
})

/**
 * @description: 粘贴后处理数据
 * @param {string}text
 * @return {*}
 */
const handle = (text: string): void => {
  if (!text) {
    return
  }
  // 清除空格
  text = text.trim()
  // 替换单引号为双引号
  text = text.replaceAll("'", '"')
  // 为没有引号的 JSObject key 加上引号
  text = text.replace(/(?<!")\b\w+(?=\s*:)/g, '"$&"')
  try {
    inputDom.value = JSON.stringify(JSON.parse(text), null, 2)
  } catch (error) {
    inputDom.value = text
  }
}

/**
 * @description: 从剪切板粘贴数据
 * @param {*}
 * @return {*}
 */
const paste = (): void => {
  // 从剪切板读取数据
  navigator.clipboard
    .readText()
    .then(handle)
    .catch(() => message.error('粘贴失败，请允许应用访问剪切板'))
}

/**
 * @description: 当用户点击 input 区域，提示用户点击粘贴按钮
 * @param {*}
 * @return {*}
 */
const click = (): void => {
  if (!inputDom.value) {
    message.destroy()
    message.info('点击粘贴按钮粘贴数据')
  }
}

/**
 * @description: 复制 interface 到剪切板
 * @param {*}
 * @return {*}
 */
const copy = (): void => {
  if (outputDom.value) {
    navigator.clipboard
      .writeText(outputDom.value)
      .then(() => message.success('复制成功'))
      .catch(() => message.error('复制失败，请允许应用访问剪切板'))
  } else {
    message.destroy()
    message.info('输出无数据')
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
