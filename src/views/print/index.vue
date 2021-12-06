<template>
  <div class="print flexc">
    <h1>Electron 静默打印</h1>
    <a-divider />
    <h3>打印机列表</h3>
    <a-table class="w100" rowKey="id" :data-source="list" bordered :pagination="false">
      <a-table-column key="name" title="name" data-index="name" />
      <a-table-column key="displayName" title="displayName" data-index="displayName" />
      <a-table-column key="description" title="description" data-index="description" />
      <a-table-column key="status" title="status" data-index="status" />
      <a-table-column key="isDefault" title="isDefault" data-index="isDefault" />
    </a-table>
    <a-divider />
    <h3>打印内容</h3>
    <a-divider />
    <webview :src="src" ref="webview" nodeintegration :style="{ width: pageSize.with + 'mm', height: pageSize.height + 'mm' }" />
    <a-divider />
    <a-button type="primary" @click="print">打印</a-button>
  </div>
</template>

<script setup lang="ts">
import IPC from '@/../app/src/IPC'
import { message } from 'ant-design-vue'
import { ref, Ref, computed, onMounted, onUnmounted } from 'vue'
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

// 获取打印机列表
const getPrintList = () => {
  ipcRenderer.invoke(IPC.GET_PRINTER_LIST).then((config: Array<PrinterInfo>) => {
    list.value = config.map((e: PrinterInfo) => ({ ...e, id: Math.random().toString(), isDefault: e.isDefault ? '是' : '否' }))
  })
}

// 页面挂载完毕
onMounted(() => {
  // 获取打印机列表
  getPrintList()
  // 实时获取打印机列表
  const timer = setInterval(getPrintList, 1000)
  // 页面关闭
  onUnmounted(() => {
    // 清除定时器
    clearInterval(timer)
  })
})

const print = () => {
  if (list.value.length) {
    webview.value
      .print({
        silent: true,
        deviceName: 'Zebra_Technologies_ZTC_ZD420_300dpi_ZPL',
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
    message.error('请连接打印机')
  }
}
</script>

<style lang="scss" scoped>
.print {
  .ant-divider {
    margin: 8px 0;
  }
}
</style>
