
declare global {
    interface Window {
        // 通过 preload 脚本暴露一些 API
        fs: typeof import('fs')
        ipcRenderer: import('electron').IpcRenderer
    }
}
export {}
