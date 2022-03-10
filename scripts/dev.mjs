import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'

function watchMain (server) {
    let electronProcess = null
    const address = server.httpServer.address()
    console.log('-----启动url-----', `http://${address.address}:${address.port}`)
    // const env = Object.assign(process.env, {
    //     VITE_DEV_SERVER_HOST: address.address,
    //     VITE_DEV_SERVER_PORT: address.port,
    // })

    return build({
        configFile: 'packages/main/vite.config.ts',
        mode: 'development',
        plugins: [{
            name: 'electron-main-watcher',
            writeBundle () {
                electronProcess && electronProcess.kill()
                electronProcess = spawn(electron, ['.'], { stdio: 'inherit' })
            },
        }],
        build: {
            watch: true,
        },
    })
}

// vite 开发服务器
const server = await createServer({ configFile: 'packages/renderer/vite.config.ts' })

// 启动 vite 服务器
await server.listen()
// await watchPreload(server)
// 监听主进程
await watchMain(server)
