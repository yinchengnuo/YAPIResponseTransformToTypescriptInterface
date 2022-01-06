import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { build, Platform, Configuration, BuildResult } from 'electron-builder'

// mac 系统删除 build 目录
if (process.platform === 'darwin') {
  exec(`rm -r ${path.resolve(__dirname, '../build')}`)
}

// window 系统删除 build 目录
if (process.platform === 'win32') {
  exec(`rd/s/q ${path.resolve(__dirname, '../build')}`)
}

const config: Configuration = {
  files: ['dist/**/*'],
  productName: 'TS接口转换器',
  appId: 'yapiresponsetransformtotypescriptinterface',
  // eslint-disable-next-line no-template-curly-in-string
  artifactName: '${productName}_${version}.${ext}',
  buildVersion: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString()).version,
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
  },
  // 打包完成替换 yml 中的 appid 为 productName
  afterAllArtifactBuild (context: BuildResult): any {
    const name = context.configuration.productName
    const version = context.configuration.buildVersion
    const platform = Array.from(context.platformToTargets.keys())[0].name
    const regExp = new RegExp(`${context.configuration.appId}.+(?=....)`, 'g')
    let ymlPath = ''
    if (platform === 'windows') {
      ymlPath = path.resolve(context.outDir, 'latest.yml')
    }
    if (platform === 'mac') {
      ymlPath = path.resolve(context.outDir, 'latest-mac.yml')
    }
    if (ymlPath) {
      setTimeout(() => {
        fs.writeFileSync(ymlPath, fs.readFileSync(ymlPath).toString().replace(regExp, `${name}_${version}`))
      }, 999)
    }
  }
}

Promise.all([
  process.platform === 'darwin'
    ? build({
      config,
      targets: Platform.MAC.createTarget()
    })
    : Promise.resolve(),
  build({
    config,
    targets: Platform.WINDOWS.createTarget()
  })
]).then(() => {
  console.log('\x1b[32m', '打包完成🎉🎉🎉你要的都在 build 目录里🤪🤪🤪')
})
