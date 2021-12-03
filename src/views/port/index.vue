<template>
  <div class="port flexc">
    <h1>Electron 串口通信</h1>
    <a-divider />
    <h1>串口列表</h1>
    <a-table class="w100" rowKey="pnpId" :data-source="list" bordered :pagination="false">
      <a-table-column key="path" title="path" data-index="path" />
      <a-table-column key="pnpId" title="pnpId" data-index="pnpId" />
      <a-table-column key="vendorId" title="vendorId" data-index="vendorId" />
      <a-table-column key="productId" title="productId" data-index="productId" />
      <a-table-column key="locationId" title="locationId" data-index="locationId" />
      <a-table-column key="serialNumber" title="serialNumber" data-index="serialNumber" />
      <a-table-column key="manufacturer" title="manufacturer" data-index="manufacturer" />
    </a-table>
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
import Port from 'serialport'
import IPC from '@/../app/src/IPC'
import { message } from 'ant-design-vue'
import { ref, Ref, onMounted, onUnmounted } from 'vue'

const { ipcRenderer } = require('electron')

const list: Ref<Array<Port>> = ref([])

// 获取串口列表
const getPortList = () => {
  ipcRenderer
    .invoke(IPC.GET_PORT_LIST)
    .then((config: Array<Port>) => {
      list.value = config
    })
    .catch((e: Error) => message.error(e.message))
}

// 页面挂载完毕
onMounted(() => {
  // 获取串口列表
  getPortList()
  // 实时获取串口列表
  const timer = setInterval(getPortList, 1000)
  // 页面关闭
  onUnmounted(() => {
    // 清除定时器
    clearInterval(timer)
  })
})

// 打开串口
const openPort = () => {
  ipcRenderer
    .invoke(IPC.OPEN_PORT)
    .then(() => {
      message.success('操作成功')
    })
    .catch((e: Error) => message.error(e.message))
}

// 关闭串口
const closePort = () => {
  ipcRenderer
    .invoke(IPC.CLOSE_PORT)
    .then(() => {
      message.success('操作成功')
    })
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
    text-align: center;
  }
  .ant-divider {
    margin: 8px 0;
  }
}
</style>
