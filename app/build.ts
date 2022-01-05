import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import { build, Platform, Configuration, BuildResult } from 'electron-builder'

const mac = process.platform === 'darwin'

exec(`${mac ? 'rm -r ' : 'rd/s/q '}${path.resolve(__dirname, '../build')}`)

const config: Configuration = {
  appId: 'yapiresponsetransformtotypescriptinterface',
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
  },
  afterAllArtifactBuild (context: BuildResult): any {
    const name = Array.from(context.platformToTargets.keys())[0].name
    const regExp = new RegExp(context.configuration.appId + '.+(?=....)', 'g')
    if (Array.from(context.platformToTargets.keys())[0].name === 'windows') {
      let ymlPath = path.resolve(context.outDir, 'latest.yml')
      if (name === 'mac') {
        ymlPath = path.resolve(context.outDir, 'latest-mac.yml')
      }
      setTimeout(() => {
        fs.writeFileSync(ymlPath, fs.readFileSync(ymlPath).toString().replace(regExp, context.configuration.productName))
      }, 999)
    }
  }
}

Promise.all([
  mac
    ? build({
      config,
      targets: Platform.MAC.createTarget()
    })
    : Promise.resolve(),
  build({
    config,
    targets: Platform.WINDOWS.createTarget()
  })
])
