<template>
  <div v-if="$route.path === '/'" class="bar flex">
    <a-button type="link" @click="$router.push('/port')">串口测试</a-button>
    <span> v {{ version }}</span>
    <a-button type="link" @click="$router.push('/print')">打印测试</a-button>
  </div>
</template>

<script setup lang="ts">
import IPC from '@/../app/src/IPC'
import { version } from '@/../package.json'
import { notification, Modal } from 'ant-design-vue'
const { ipcRenderer } = require('electron')

interface NotificationConfig {
  message: string;
  percent: string;
  description: string;
}

let confirm: any
// 关闭应用
ipcRenderer.on(IPC.CLOSE_APP, () => {
  if (!confirm) {
    confirm = Modal.confirm({
      centered: true,
      title: () => '提示',
      content: () => ' 确认退出应用？',
      onOk () {
        ipcRenderer.invoke(IPC.DO_CLOSE_APP)
      },
      onCancel () {
        confirm = null
      }
    })
  }
})

// 开始检查更新
ipcRenderer.on(IPC.UPDATA_CHECKING, (_: Event, config: NotificationConfig) => {
  notification.open({ ...config })
})

// 检查更新出错
ipcRenderer.on(IPC.UPDATA_ERROR, (_: Event, config: NotificationConfig, error: Error) => {
  notification.open({ ...config })
  console.log(error)
})

// 检查到新版本
ipcRenderer.on(IPC.UPDATA_AVAILABLE, (_: Event, config: NotificationConfig) => {
  notification.open({ ...config })
})

// 已经是新版本
ipcRenderer.on(IPC.UPDATA_NOT_AVAILABLE, (_: Event, config: NotificationConfig) => {
  notification.open({ ...config })
})

// 更新下载完毕
ipcRenderer.on(IPC.UPDATA_DOWNLOADED, () => {
  Modal.confirm({
    title: () => '应用更新',
    content: '新版本已经准备就绪，是否现在更新',
    onOk () {
      ipcRenderer.invoke(IPC.UPDATA_QUITANDINSTALL)
    },
    onCancel () {
      ipcRenderer.invoke(IPC.UPDATA_DOWNLOADED_NOT_INSTALLED)
    }
  })
})

// 强制更新安装
ipcRenderer.on(IPC.UPDATA_DOWNLOADED_QUIT_INSTALL, () => {
  let counter = 5
  const config = {
    title: () => '应用更新',
    content: '新版本已经准备就绪，即将开始安装，请勿关闭电脑',
    okText: `${counter}S后开始安装`
  }
  const info = Modal.info(config)
  const timer = setInterval(() => {
    counter--
    info.update({
      ...config,
      okText: `${counter}S后开始安装`
    })
    if (counter === 0) {
      ipcRenderer.invoke(IPC.UPDATA_QUITANDINSTALL)
      clearInterval(timer)
    }
  }, 1000)
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
