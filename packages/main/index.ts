import { app, BrowserWindow, shell } from 'electron'
import { release } from 'os'
import { join } from 'path'
import pkg from '../../package.json'
import dmHandler from './dm/dm'

// 大漠插件初始化
dmHandler()

// 应用是否取得锁，取锁失败则退出，单开模式
// if (!app.requestSingleInstanceLock()) {
//     app.quit()
//     process.exit(0)
// }

// 禁用 win7 的 GPU 加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// 为 win10+ 的通知设置应用程序名称
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

let win: BrowserWindow | null = null

// 创建应用窗口
async function createWindow () {
    win = new BrowserWindow({
        title: 'Main window',
        width: 1600,
        height: 1000,
        webPreferences: {
            preload: join(__dirname, '../preload/index.cjs'),
            nativeWindowOpen: true,
        },
    })

    // 应用是否打包，判断是否生产环境
    if (app.isPackaged || process.env.DEBUG) {
        win.loadFile(join(__dirname, '../renderer/index.html'))
    } else {
        // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
        // 开发环境
        const url = `http://${pkg.server.host}:${pkg.server.port}`

        win.loadURL(url)
        win.webContents.openDevTools()
    }

    // 测试主动推送消息到渲染器进程
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date()).toLocaleString())
    })

    // 使用浏览器打开所有链接，而不是使用应用程序
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })
}

// 主进程准备完毕再加载窗口
app.whenReady().then(createWindow)

// 窗口关闭时退出主进程
app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') app.quit()
})

// 监听第二个实例启动
// app.on('second-instance', () => {
//     if (win) {
//         // Focus on the main window if the user tried to open another
//         if (win.isMinimized()) win.restore()
//         win.focus()
//     }
// })

// 监听应用激活
app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})
