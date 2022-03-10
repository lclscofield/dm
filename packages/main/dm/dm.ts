/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * dm 插件注册，及接受渲染进程的调用
 */
import winax from 'winax'
import { execSync } from 'child_process'
import { ipcMain } from 'electron'

// 调用大漠插件
function getDm () {
    try {
        return new winax.Object('dm.dmsoft')
    } catch (error) {
        execSync('regsvr32 ../dll/dm.dll /s')
        return new winax.Object('dm.dmsoft')
    }
}

const dm = getDm()

export default () => {
    ipcMain.handle('dm', async (event, method: string, args: any[]) => {
        return await dm[method](...args)
    })
}
