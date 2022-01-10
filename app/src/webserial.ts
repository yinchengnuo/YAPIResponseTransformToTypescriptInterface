import { ipcMain, BrowserWindow } from 'electron'
import IPC from './IPC'

/**
 * @description: 初始化串口相关
 * @param {BrowserWindow} window
 * @return {*}
 */

interface Port {
  usbVendorId: string
  usbProductId: string
}
let selectedPort: null | Port = null
export default (window: BrowserWindow): void => {
  // 选择串口
  ipcMain.on(IPC.SELECT_POR, (_, port: Port) => {
    selectedPort = port
  })
  window.webContents.session.on('select-serial-port', function (event, portList, webContents, callback) {
    event.preventDefault()
    if (selectedPort) {
      const portId = portList.find((device) => device.vendorId === selectedPort?.usbVendorId && device.productId === selectedPort.usbProductId)?.portId as string
      selectedPort = null
      callback(portId)
    } else {
      webContents.send(
        IPC.GOT_PORT_LIST,
        portList.filter((device) => device.vendorId && device.productId)
      )
    }
  })
}
