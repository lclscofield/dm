/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * dm 插件注册，及接受渲染进程的调用
 */
import winax from 'winax'
import { execSync } from 'child_process'
import { app, ipcMain } from 'electron'
import path from 'path'

// 调用大漠插件
function getDm () {
    try {
        return new winax.Object('dm.dmsoft')
    } catch (error) {
        let dllPath = path.resolve(__dirname, 'resources/dm.dll')
        if (app.isPackaged) {
            // 打包后 dll 文件加载路径
            dllPath = path.resolve(__dirname, '../../../dm.dll')
        }
        // 注册 dm.dll 到系统，再直接加载 dm.dmsoft
        execSync(`regsvr32 ${dllPath} /s`)
        return new winax.Object('dm.dmsoft')
    }
}

const dm = getDm()

export default () => {
    ipcMain.handle('dm', async (event, method: string, args: any[]) => {
        return await dm[method](...args)
    })
}
