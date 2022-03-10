/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * dm 函数，调用主进程 dm 插件
 */

export default async function (method: string, args: any[]) {
    return await window.ipcRenderer.invoke('dm', method, args)
}
