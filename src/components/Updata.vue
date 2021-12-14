<template>
  <div v-if="$route.path === '/'" class="bar flex">
    <a-button type="link" @click="$router.push('/port')">串口测试</a-button>
    <span> v {{ version }}</span>
    <a-button type="link" @click="$router.push('/print')">打印测试</a-button>
  </div>
  <a-progress v-if="percent" status="active" :percent="percent" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IPC from '@/../app/src/IPC'
import { version } from '@/../package.json'
import { notification, Modal } from 'ant-design-vue'
import { NsisUpdater, UpdateInfo } from 'electron-updater'
const { ipcRenderer } = require('electron')
const percent = ref('0')

interface NotificationConfig {
  message: string;
  percent: string;
  description: string;
}

// 实例化 autoUpdater
const autoUpdater = new NsisUpdater({
  provider: 'generic',
  url: 'https://7463-tcb-wvejp0kobnwg4yva44474-1164c4-1302828448.tcb.qcloud.la/electron'
})

// 开始检查更新
autoUpdater.on('checking-for-update', () => {
  notification.open({
    message: '开始检查更新'
  })
})

// 检查更新出错
autoUpdater.on('error', () => {
  notification.open({
    message: '检查更新出错'
  })
})

// 检查到新版本
autoUpdater.on('update-available', (info: UpdateInfo) => {
  notification.open({
    message: `检查到新版本 v ${info.version}，开始下载`
  })
})

// 已经是新版本
autoUpdater.on('update-not-available', (info: UpdateInfo) => {
  notification.open({
    message: `当前版本已经是最新 v ${info.version}`
  })
})

// 更新下载中
autoUpdater.on('download-progress', (info: { percent: string }) => {
  percent.value = Number(info.percent).toFixed(0)
})

// 更新下载完毕
autoUpdater.on('update-downloaded', () => {
  notification.open({
    message: '新版本下载完毕'
  })
})

autoUpdater.checkForUpdatesAndNotify()

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
  percent.value = Number(config.percent).toFixed(0)
})

// 更新下载完毕
ipcRenderer.on(IPC.UPDATA_DOWNLOADED, () => {
  Modal.confirm({
    title: () => '新版本已经准备就绪，是否现在更新',
    onOk () {
      // ipcRenderer.invoke(IPC.UPDATA_QUITANDINSTALL)
      autoUpdater.quitAndInstall()
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
