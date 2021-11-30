<template>
  <div class="bar flex">
    <a-button type="link" @click="$router.push('/serialport')">串口测试</a-button>
    <span> v {{ version }}</span>
    <a-button type="link" @click="$router.push('/print')">打印测试</a-button>
  </div>
  <a-progress v-if="percent" status="active" :percent="percent" />
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
.bar {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20px;
  padding: 0 24px;
  position: fixed;
  font-weight: bolder;
  white-space: nowrap;
  box-sizing: border-box;
}
.ant-progress {
  top: 0;
  left: 24px;
  position: fixed;
  width: calc(100vw - 48px);
}
</style>
