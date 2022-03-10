import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'

// 观察主进程
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

// 观察预加载
function watchPreload (server) {
    return build({
        configFile: 'packages/preload/vite.config.ts',
        mode: 'development',
        plugins: [{
            name: 'electron-preload-watcher',
            writeBundle () {
                server.ws.send({ type: 'full-reload' })
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
// 观察预加载
await watchPreload(server)
// 观察主进程
await watchMain(server)
