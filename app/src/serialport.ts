import IPC from './IPC'
import Port, { PortInfo } from 'serialport'
import { ipcMain, BrowserWindow } from 'electron'

/**
 * @description: 初始化串口相关
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  let port: Port
  // 获取串口列表
  ipcMain.handle(IPC.GET_PORT_LIST, () => {
    return new Promise((resolve, reject) => {
      Port.list().then((ports: Array<PortInfo>, error?: Error) => {
        if (error) {
          reject(new Error(error.message))
        } else {
          resolve(ports)
        }
      })
    })
  })
  // 打开串口
  ipcMain.handle(IPC.OPEN_PORT, (event, name, config) => {
    return new Promise((resolve, reject) => {
      port = new Port(name, config, (error) => {
        if (error) {
          reject(new Error(error.message))
        }
        resolve('串口打开成功')
      })
      port.open(() => {
        port.on('data', (data: Buffer) => {
          window.webContents.send(IPC.ACCEPT_DATA_FROM_PORT, data.toString())
        })
      })
    })
  })
  // 关闭串口
  ipcMain.handle(IPC.CLOSE_PORT, () => {
    return new Promise((resolve, reject) => {
      if (port) {
        port.close((error) => {
          if (error) {
            reject(new Error(error.message))
          }
          resolve('串口关闭成功')
        })
      } else {
        reject(new Error('没有打开的串口'))
      }
    })
  })
  // 向串口发送数据
  ipcMain.handle(IPC.SEND_DATA_TO_PORT, (event, data) => {
    return new Promise((resolve, reject) => {
      if (port) {
        port.write(Buffer.from(data), (error) => {
          if (error) {
            reject(new Error(error.message))
          }
          resolve('发送成功')
        })
      } else {
        reject(new Error('没有打开的串口'))
      }
    })
  })
}
