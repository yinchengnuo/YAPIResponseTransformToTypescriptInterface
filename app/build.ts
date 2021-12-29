import { build, Platform, Configuration } from 'electron-builder'

const config: Configuration = {
  appId: 'TS接口转换器',
  productName: 'TS接口转换器',
  files: ['dist/**/*'],
  // eslint-disable-next-line no-template-curly-in-string
  artifactName: '${productName}_${version}.${ext}',
  directories: {
    output: 'build'
  },
  win: {
    icon: 'src/assets/icon.png'
  },
  mac: {
    icon: 'src/assets/icon.png'
  },
  electronDownload: {
    mirror: 'https://npm.taobao.org/mirrors/electron/'
  }
}

Promise.all([
  build({
    config,
    targets: Platform.MAC.createTarget()
  }),
  build({
    config,
    targets: Platform.WINDOWS.createTarget()
  })
])
