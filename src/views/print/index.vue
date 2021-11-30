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
    <webview
      :src="src"
      ref="webview"
      nodeintegration
      webpreferences="allowRunningInsecureContent, webSecurity=true"
      :style="{ width: pageSize.with + 'mm', height: pageSize.height + 'mm' }"
    ></webview>
    <br />
    <a-button type="primary" @click="print">打印</a-button>
  </div>
</template>

<script setup lang="ts">
import IPC from '@/../app/src/IPC'
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
  with: 100,
  height: 44
}

const webview = ref()
const list: Ref<Array<PrinterInfo>> = ref([])

const src = computed(() =>
  URL.createObjectURL(
    new Blob([raw.replace('$1', '20211130205413298123').replace('$2', '白条').replace('$3', '合格').replace('$4', '尹成诺').replace('$5', new Date().toLocaleDateString())], {
      type: 'text/html'
    })
  )
)

// 实时获取打印机列表
ipcRenderer.on(IPC.GOT_PRINTER_LIST, (_: Event, config: Array<PrinterInfo>) => {
  list.value = config.map((e: PrinterInfo) => ({ ...e, id: Math.random().toString(), isDefault: e.isDefault ? '是' : '否' }))
})

const print = () => {
  webview.value.print({
    // deviceName: 'Zebra_Technologies_ZTC_ZD420_300dpi_ZPL',
    // deviceName: 'TSC_TTP_342_Pro',÷
    margins: {
      marginType: 'none'
    },
    pageRanges: [{ from: 0, to: 0 }],
    pageSize: {
      width: pageSize.with * 1000,
      height: pageSize.height * 1000
    }
  })
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
