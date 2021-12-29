const esbuild = require('esbuild')
const electron = require('electron-connect').server.create()
const { nodeExternalsPlugin } = require('esbuild-node-externals')

const development = process.env.ELECTRON_ENV === 'development'

esbuild
  .build({
    minify: true, // 压缩代码
    bundle: true, // 打包模块
    format: 'cjs', // 输出为 common JS
    platform: 'node', // 平台 node
    outdir: './dist', // 输出到 build 文件夹
    plugins: [nodeExternalsPlugin()], // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
    entryPoints: ['app/index.ts', 'app/preload.ts', 'app/build.ts'], // 入口文件
    watch: development
      ? {
          onRebuild: (err) => {
            if (!err) {
              console.log('\x1B[31m%s\x1B[0m', '主进程代码变更，请适时重启开发环境')
              // electron.restart()
            }
          }
        }
      : undefined
  })
  .then(() => {
    // 开发环境 打包完成后启动 electron
    if (development) {
      electron.start()
    }
  })
