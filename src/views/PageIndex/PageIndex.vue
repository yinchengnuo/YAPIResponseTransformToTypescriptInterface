<template>
  <div class="PageIndex">
    <a-page-header
      title="Title"
      class="site-page-header"
      sub-title="This is a subtitle"
      :avatar="{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }"
    >
      <template #tags>
        <a-tag color="blue">Running</a-tag>
      </template>
      <template #extra>
        <a-button key="3">Operation</a-button>
        <a-button key="2">Operation</a-button>
        <a-button key="1" type="primary">Primary</a-button>
        <a-dropdown key="more">
          <a-button :style="{ border: 'none', padding: 0 }">
            <EllipsisOutlined :style="{ fontSize: '20px', verticalAlign: 'top' }" />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/"> 1st menu item </a>
              </a-menu-item>
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/"> 2nd menu item </a>
              </a-menu-item>
              <a-menu-item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/"> 3rd menu item </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <a-row class="content">
        <div style="flex: 1">
          <p>
            Ant Design interprets the color system into two levels: a system-level color system and a product-level
            color system.
          </p>
          <p>
            Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it easier for
            designers to have a clear psychological expectation of color when adjusting colors, as well as facilitate
            communication in teams.
          </p>
          <div>
            <template v-for="item in iconLinks" :key="item.src">
              <a class="example-link">
                <img class="example-link-icon" :src="item.src" :alt="item.text" />
                {{ item.text }}
              </a>
            </template>
          </div>
        </div>
        <div class="image">
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
            alt="content"
            style="width: 100%"
          />
        </div>
      </a-row>
    </a-page-header>
  </div>
</template>

<script setup lang="ts">
import check from '@/utils/check'
import transform from '@/utils/transform'
import data from './data.json'
import { EllipsisOutlined } from '@ant-design/icons-vue'

interface IconLink {
  src: string;
  text: string;
}
const iconLinks: IconLink[] = [
  {
    src: 'https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg',
    text: 'Quick Start'
  },
  {
    src: 'https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg',
    text: 'Product Info'
  },
  {
    src: 'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg',
    text: 'Product Doc'
  }
]

if (check(data)) {
  console.log(JSON.stringify(transform(data), null, 2).replaceAll('"', '').replaceAll('[', '').replaceAll(']', '[]'))
}
</script>

<style lang="scss" scoped>
.PageIndex {
  height: auto;
}
</style>
