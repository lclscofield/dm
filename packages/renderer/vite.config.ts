import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
    mode: process.env.NODE_ENV,
    root: __dirname,
    base: './',
    plugins: [
        // vue 插件
        vue({
            reactivityTransform: true, // 显式启用响应性语法糖
        }),
    ],
    resolve: {
        // 别名
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
        ],
    },
    // env 文件目录
    envDir: '../../env',
    build: {
        sourcemap: true,
        outDir: '../../dist/renderer',
        emptyOutDir: true,
    },
    // 开发服务器
    server: {
        ...pkg.server,
    },
})
