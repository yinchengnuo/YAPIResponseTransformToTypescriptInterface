<template>
  <div class="port flexc">
    <h1>Electron 串口通信</h1>
    <a-divider />
    <a-button type="primary" @click="getPortList">获取串口列表</a-button>
    <a-divider />
    <a-button type="primary" @click="openPort">打开串口</a-button>
    <a-divider />
    <a-button type="primary" @click="closePort">关闭串口</a-button>
    <a-divider />
    <a-button type="primary" @click="sendData">发送数据</a-button>
    <a-divider />
    <h1>接受数据</h1>
  </div>
</template>

<script setup lang="ts">
import IPC from '@/../app/src/IPC'
import { message } from 'ant-design-vue'
const { ipcRenderer } = require('electron')

// 获取串口列表
const getPortList = () => {
  ipcRenderer
    .invoke(IPC.GET_PORT_LIST)
    .then(console.log)
    .catch((e: Error) => message.error(e.message))
}

// 打开串口
const openPort = () => {
  ipcRenderer
    .invoke(IPC.OPEN_PORT)
    .then(console.log)
    .catch((e: Error) => message.error(e.message))
}

// 关闭串口
const closePort = () => {
  ipcRenderer
    .invoke(IPC.CLOSE_PORT)
    .then(console.log)
    .catch((e: Error) => message.error(e.message))
}

// 发送数据
const sendData = () => {
  ipcRenderer
    .invoke(IPC.SEND_DATA_TO_PORT)
    .then(console.log)
    .catch((e: Error) => message.error(e.message))
}
</script>

<style lang="scss" scoped>
.port {
  h1 {
    margin-top: 24px;
    text-align: center;
  }
}
</style>
