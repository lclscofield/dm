/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron'

/** dom 准备完毕 */
function domReady (condition: DocumentReadyState[] = ['complete', 'interactive']) {
    return new Promise(resolve => {
        if (condition.includes(document.readyState)) {
            resolve(true)
        } else {
            document.addEventListener('readystatechange', () => {
                if (condition.includes(document.readyState)) {
                    resolve(true)
                }
            })
        }
    })
}

// 等待 dom 准备完毕
(async () => {
    await domReady()
})()

// --------- 向 Renderer 进程公开一些 API ---------
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

// `exposeInMainWorld` 无法检测 `prototype` 的属性和方法，手动修复
function withPrototype (obj: Record<string, any>) {
    const protos = Object.getPrototypeOf(obj)

    for (const [key, value] of Object.entries(protos)) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) continue

        if (typeof value === 'function') {
            // 一些原生 API，例如 `NodeJS.EventEmitter['on']`，在 Renderer 进程中不起作用，将它们包装成一个函数
            obj[key] = function (...args: any) {
                return value.call(obj, ...args)
            }
        } else {
            obj[key] = value
        }
    }
    return obj
}
