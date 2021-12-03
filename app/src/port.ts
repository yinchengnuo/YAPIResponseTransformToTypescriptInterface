import IPC from './IPC'
import Port, { PortInfo } from 'serialport'
import { ipcMain, BrowserWindow } from 'electron'

/**
 * @description: 初始化串口相关
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  let port: Port | null
  // 获取串口列表
  ipcMain.handle(IPC.GET_PORT_LIST, () => {
    return new Promise((resolve, reject) => {
      Port.list().then((ports: Array<PortInfo>, error?: Error) => {
        if (error) {
          reject(new Error(`串口列表获取失败：${error.message}`))
        } else {
          resolve(ports)
        }
      })
    })
  })
  // 打开串口
  ipcMain.handle(IPC.OPEN_PORT, (event, config) => {
    return new Promise((resolve, reject) => {
      port = new Port(
        'COM1',
        {
          baudRate: 9600,
          dataBits: 8,
          parity: 'none',
          stopBits: 1
        },
        (error) => {
          if (error) {
            reject(new Error(`串口打开失败: ${error.message}`))
          }
          resolve('串口打开成功')
        }
      )
    })
  })
  // 关闭串口
  ipcMain.handle(IPC.CLOSE_PORT, function () {
    return new Promise((resolve, reject) => {
      if (port) {
        port.close((error) => {
          if (error) {
            reject(new Error(`串口关闭失败：${error.message}`))
          }
          port = null
          resolve('串口关闭成功')
        })
      } else {
        reject(new Error('串口不存在'))
      }
    })
  })
}
