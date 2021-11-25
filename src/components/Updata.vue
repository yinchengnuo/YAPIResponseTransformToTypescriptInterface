<template>
  <div class="Updata flex">
    <span class="version"> v {{ version }}</span>
    <a-progress v-if="percent && percent < 100" :percent="percent" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IPC from '@/../app/src/IPC'
import { notification, Modal } from 'ant-design-vue'
const { ipcRenderer } = require('electron')

const version = window.version
const percent = ref(0)

interface NotificationConfig {
  message: string;
  percent: string;
  description: string;
}

// 开始检查更新
ipcRenderer.on(IPC.UPDATA_CHECKING, (_: Event, config: NotificationConfig) => {
  notification.open({ ...config })
})

// 检查更新出错
ipcRenderer.on(IPC.UPDATA_ERROR, (_: Event, config: NotificationConfig) => {
  notification.open({ ...config })
})

// 检查到新版本
ipcRenderer.on(IPC.UPDATA_AVAILABLE, (_: Event, config: NotificationConfig) => {
  notification.open({ ...config })
})

// 已经是新版本
ipcRenderer.on(IPC.UPDATA_NOT_AVAILABLE, (_: Event, config: NotificationConfig) => {
  notification.open({ ...config })
})

// 更新下载中
ipcRenderer.on(IPC.UPDATA_DOWNLOAD_PROGRESS, (_: Event, config: NotificationConfig) => {
  percent.value = Number(config.percent)
})

// 更新下载完毕
ipcRenderer.on(IPC.UPDATA_DOWNLOADED, () => {
  Modal.confirm({
    title: () => '新版本已经准备就绪，是否现在更新',
    onOk () {
      ipcRenderer.invoke(IPC.UPDATA_QUITANDINSTALL)
    }
  })
})
</script>

<style lang="scss" scoped>
.Updata {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20px;
  padding: 0 24px;
  position: fixed;
  box-sizing: border-box;
  .version {
    font-weight: bolder;
    white-space: nowrap;
  }
  .ant-progress {
    margin-left: 24px;
  }
}
</style>
