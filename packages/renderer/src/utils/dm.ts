/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * dm 函数，调用主进程 dm 插件
 */
// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
// const { ipcRenderer } = require('electron')
import { ipcRenderer } from 'electron'

export default async function (method: string, args: any[]) {
    return await ipcRenderer.invoke('dm', method, args)
}
