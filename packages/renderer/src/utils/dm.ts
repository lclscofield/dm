/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * dm 对象
 * 可以通过 use 函数调用主进程 dm 插件
 * 也可以直接使用封装好的函数，以获得更好的提示
 */

/**
 * 通过 use 函数去调用主进程的大漠插件
 * @param method 插件方法
 * @param args 参数集合
 * @returns
 */
async function use (method: string, args: any[]): Promise<any> {
    const ret = await window.ipcRenderer.invoke('dm', method, args)
    console.log(`-----${method}-----`, ret)
    return ret
}

export default {
    use,

    // 系统 API
    /**
     * 运行指定的应用程序
     * @param appPath 指定的可执行程序全路径，或程序名
     * @param mode 0 : 普通模式 1 : 加强模式
     * @returns 0 : 失败 1 : 成功
     */
    runApp: async (appPath: string, mode: 0 | 1): Promise<0 | 1> => {
        return await use('RunApp', [appPath, mode])
    },
}
