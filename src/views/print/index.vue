<template>
  <div class="print flexc">
    <h1>Electron 静默打印</h1>
    <hr class="w100" />
    <h1>打印机列表</h1>
    <a-table class="w100" rowKey="id" :data-source="list" bordered :pagination="false">
      <a-table-column key="name" title="name" data-index="name" />
      <a-table-column key="displayName" title="displayName" data-index="displayName" />
      <a-table-column key="description" title="description" data-index="description" />
      <a-table-column key="status" title="status" data-index="status" />
      <a-table-column key="isDefault" title="isDefault" data-index="isDefault" />
    </a-table>
    <br />
    <hr class="w100" />
    <br />
    <h1>打印机内容</h1>
    <br />
    <webview :src="src" ref="webview" nodeintegration :style="{ width: pageSize.with + 'mm', height: pageSize.height + 'mm' }"></webview>
    <br />
    <a-button type="primary" @click="print">打印</a-button>
  </div>
</template>

<script setup lang="ts">
import IPC from '@/../app/src/IPC'
import { message } from 'ant-design-vue'
import { ref, Ref, computed } from 'vue'
import raw from './print.html?raw'

const { ipcRenderer } = require('electron')

interface PrinterInfo {
  id: string;
  name: string;
  displayName: string;
  description: string;
  status: number;
  isDefault: string;
  options: {
    copies: string;
  };
}
const pageSize = {
  with: 80,
  height: 60
}

const webview = ref()
const list: Ref<Array<PrinterInfo>> = ref([])

const src = computed(() =>
  URL.createObjectURL(
    new Blob(
      [
        raw
          .replace('$1', '冻猪精品黄喉（非零售）')
          .replace('$2', '10kg')
          .replace('$3', '02')
          .replace('$4', '0 ℃ 以下冷藏')
          .replace('$5', '45天')
          .replace('$6', '2021年12月01')
          .replace('$7', 'GB 2707')
          .replace('$8', '牧原肉食品有限公司')
          .replace('$9', '河南省内乡县灌张镇前湾村312国道南')
          .replace('$10', '0377-6279999')
      ],
      {
        type: 'text/html'
      }
    )
  )
)

// 实时获取打印机列表
ipcRenderer.on(IPC.GOT_PRINTER_LIST, (_: Event, config: Array<PrinterInfo>) => {
  list.value = config.map((e: PrinterInfo) => ({ ...e, id: Math.random().toString(), isDefault: e.isDefault ? '是' : '否' }))
})

const print = () => {
  const printList = list.value.filter((e) => e.status === 0)
  if (printList.length) {
    if (printList.length === 1) {
      webview.value
        .print({
          silent: true,
          deviceName: 'TSC TTP-342 Pro',
          margins: {
            marginType: 'none'
          },
          pageRanges: [{ from: 0, to: 0 }],
          pageSize: {
            width: pageSize.with * 1000,
            height: pageSize.height * 1000
          }
        })
        .then(() => {
          message.success('打印成功')
        })
        .catch((e: Error) => {
          message.error(e.message)
        })
    } else {
      message.info('当前设备连接多台打印机，无法打印')
    }
  } else {
    message.error('请连接打印机')
  }
}
</script>

<style lang="scss" scoped>
.print {
  padding-bottom: 30px;
  h1 {
    text-align: center;
  }
}
</style>
