<template>
  <div class="port flexc">
    <h2>Electron 串口通信</h2>
    <a-divider />
    <h3>串口列表</h3>
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
    <h3>串口信息</h3>
    <a-divider />
    <a-form ref="refPortInfo" layout="inline" :model="dataPortInfo">
      <a-form-item has-feedback label="串口" name="name" :rules="[{ required: true, trigger: ['change', 'blur'], message: '串口名不能为空' }]">
        <a-input v-model:value="dataPortInfo.name" allowClear style="width: 120px" />
      </a-form-item>
      <a-form-item has-feedback label="波特率" name="baudRate" :rules="[{ required: true, type: 'number', rigger: ['change', 'blur'], message: '波特率不能为空' }]">
        <a-input-number v-model:value="dataPortInfo.baudRate" allowClear style="width: 120px" />
      </a-form-item>
      <a-form-item has-feedback label="数据位" name="dataBits" :rules="[{ required: true }]">
        <a-select v-model:value="dataPortInfo.dataBits" style="width: 120px">
          <a-select-option v-for="item in [8, 7, 6, 5]" :key="item" :value="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item has-feedback label="停止位" name="stopBits" :rules="[{ required: true }]">
        <a-select v-model:value="dataPortInfo.stopBits" style="width: 120px">
          <a-select-option v-for="item in [1, 2]" :key="item" :value="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item has-feedback label="奇偶校验" name="parity" :rules="[{ required: true }]">
        <a-select v-model:value="dataPortInfo.parity" style="width: 120px">
          <a-select-option v-for="item in ['none', 'even', 'mark', 'odd', 'space']" :key="item" :value="item">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <a-divider />
    <h3>串口操作</h3>
    <a-divider />
    <div class="flex">
      <a-button type="primary" :disabled="isPortOpened" @click="openPort">打开串口</a-button>
      <a-button type="primary" :disabled="!isPortOpened" @click="closePort">关闭串口</a-button>
    </div>
    <a-divider />
    <h3>蜂鸣器测试（发送数据至8051）</h3>
    <a-divider />
    <a-button type="primary" @mousedown="ringBuzzer('1')" @mouseup="ringBuzzer('0')">蜂鸣器</a-button>
    <a-divider />
    <h3>按键测试（从8051接受数据）</h3>
    <a-divider />
    <div class="flex">
      <a-button v-for="(status, index) in keyStatus" :key="index" :type="status ? 'primary' : ''" :danger="status">{{ String("\u200b") }}</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IPC from '@/../app/src/IPC'
import { PortInfo } from 'serialport'
import { message } from 'ant-design-vue'
import { ref, Ref, reactive, onMounted, onUnmounted } from 'vue'

const { ipcRenderer } = require('electron')

const refPortInfo = ref()
const list: Ref<Array<PortInfo>> = ref([])
const isPortOpened: Ref<boolean> = ref(false)
const keyStatus: Ref<Array<boolean>> = ref([false, false, false, false])

// 要打开的串口信息
const dataPortInfo = reactive({
  name: 'COM1',
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  baudRate: 9600
})

// 从串口接受到数据
ipcRenderer.on(IPC.ACCEPT_DATA_FROM_PORT, (_: Event, data: string) => {
  keyStatus.value = data.split('').map((e: string) => Boolean(Number(e)))
})

// 获取串口列表
const getPortList = () => {
  ipcRenderer
    .invoke(IPC.GET_PORT_LIST)
    .then((config: Array<PortInfo>) => {
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
  if (refPortInfo.value) {
    refPortInfo.value
      .validate()
      .then(() => {
        ipcRenderer
          .invoke(IPC.OPEN_PORT, dataPortInfo.name, { ...dataPortInfo })
          .then(() => {
            message.success('操作成功')
            isPortOpened.value = true
          })
          .catch((e: Error) => message.error(e.message))
      })
      .catch()
  }
}

// 关闭串口
const closePort = () => {
  ipcRenderer
    .invoke(IPC.CLOSE_PORT)
    .then(() => {
      message.success('操作成功')
      isPortOpened.value = false
    })
    .catch((e: Error) => message.error(e.message))
}

// 打开/关闭蜂鸣器
const ringBuzzer = (action: string) => {
  ipcRenderer
    .invoke(IPC.SEND_DATA_TO_PORT, action)
    .then(console.log)
    .catch((e: Error) => message.error(e.message))
}
</script>

<style lang="scss" scoped>
.port {
  .ant-divider {
    margin: 8px 0;
  }
  .ant-btn {
    margin: 0 6px;
  }
}
</style>
