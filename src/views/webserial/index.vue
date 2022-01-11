<template>
  <div class="port flexc">
    <h2>Electron 串口通信(webserial)</h2>
    <a-divider />
    <h3 class="w100 flex flex_sb">
      <span />
      <span>串口列表</span>
      <a-button type="primary" @click="getPortList">刷新串口列表</a-button>
    </h3>
    <a-table class="w100" rowKey="portId" :data-source="list" bordered :pagination="false">
      <a-table-column key="portId" title="portId" data-index="portId" />
      <a-table-column key="portName" title="portName" data-index="portName" />
      <a-table-column key="vendorId" title="vendorId" data-index="vendorId" />
      <a-table-column key="productId" title="productId" data-index="productId" />
      <a-table-column key="displayName" title="displayName" data-index="displayName" />
      <a-table-column key="usbDriverName" title="usbDriverName" data-index="usbDriverName" />
    </a-table>
    <a-divider />
    <h3>串口信息</h3>
    <a-divider />
    <a-form ref="refPortInfo" layout="inline" :model="dataPortInfo">
      <a-form-item has-feedback label="串口" name="name" :rules="[{ required: true, trigger: ['change', 'blur'], message: '串口名不能为空' }]">
        <a-select v-model:value="dataPortInfo.name" style="width: 120px">
          <a-select-option v-for="item in list" :key="item.productId" :value="item.productId">{{ item.productId }}</a-select-option>
        </a-select>
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
    <a-button type="primary" :disabled="!isPortOpened" @click="ringBuzzer">蜂鸣器</a-button>
    <a-divider />
    <h3>按键测试（从8051接收数据）</h3>
    <a-divider />
    <div class="flex">
      <div v-for="item in 4" :key="item" class="flex k" :class="{ active: item === +key }">K{{ item + 1 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IPC from '@/../app/src/IPC'
import { message } from 'ant-design-vue'
import { ref, Ref, reactive, onMounted } from 'vue'

const { ipcRenderer } = require('electron')

interface PortInfo {
  portId: string;
  portName: string;
  vendorId: string;
  productId: string;
  displayName: string;
  usbDriverName: string;
}

let port: any, reader: any, writer: any

const key = ref('')
const refPortInfo = ref()
const list: Ref<Array<PortInfo>> = ref([])
const isPortOpened: Ref<boolean> = ref(false)

// 要打开的串口信息
const dataPortInfo = reactive({
  name: '',
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  baudRate: 9600
})

// 从串口接受到数据
ipcRenderer.on(IPC.GOT_PORT_LIST, (_: Event, portList: Array<PortInfo>) => {
  list.value = portList
  if (portList.length) {
    dataPortInfo.name = portList[0].productId
  }
})

// 获取串口列表
const getPortList = () => {
  (navigator as any).serial.requestPort().then(console.log).catch(console.log)
}

// 页面挂载完毕
onMounted(() => {
  // 获取串口列表
  getPortList()
})

// 打开串口
const openPort = () => {
  if (refPortInfo.value) {
    refPortInfo.value
      .validate()
      .then(() => {
        ipcRenderer.invoke(IPC.SELECT_POR, { ...list.value.find((e) => e.productId === dataPortInfo.name) }).then(() => {
          (navigator as any).serial
            .requestPort()
            .then((_port: any) => {
              port = _port
              port
                .open(dataPortInfo)
                .then(async () => {
                  message.success('操作成功')
                  isPortOpened.value = true
                  reader = port.readable.getReader()
                  writer = port.writable.getWriter()
                  if (port && port.readable) {
                    while (isPortOpened.value) {
                      let { value } = await reader.read()
                      value = String.fromCharCode(value)
                      key.value = value
                      if (!isPortOpened.value) {
                        await Promise.all([reader.releaseLock(), writer.releaseLock()])
                        await reader.close()
                        await port.close()
                      }
                    }
                  }
                })
                .catch(() => {
                  isPortOpened.value = false
                })
            })
            .catch(console.log)
        })
      })
      .catch(console.log)
  }
}

// 关闭串口
const closePort = () => {
  isPortOpened.value = false
  message.success('操作成功')
}

// 蜂鸣器
const ringBuzzer = () => {
  writer.write(new Uint8Array([0x0]))
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
  .k {
    width: 32px;
    height: 32px;
    margin: 0 4px;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #aaa;
    &.active {
      color: #fff;
      background: #f00;
    }
  }
}
</style>
