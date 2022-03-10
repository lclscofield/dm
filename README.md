# 使用 nodejs 调用大漠插件

## 技术栈 Vite + Vue3 + Electron + TS

## 项目启动前置条件

1. `nvm` 切换 `node` 版本到 `v14.17.0` `32` 位

2. 全局安装 `node-gyp`

    ```
    npm i -g node-gyp
    ```

3. 安装 `windows-build-tools`

    ```
    npm i -g --production windows-build-tools
    ```

    如果卡住可以看 [这篇文章解决](https://bbs.huaweicloud.com/forum.php?mod=viewthread&tid=170651&extra=&ordertype=1)

## 启动项目
1. 安装依赖

    ```
    npm install
    ```

2. 运行，要用管理员模式启动，因为第一次启动会注册 `dm.dll` 到系统注册表

    ```
    npm run dev
    ```

3. 打包

    ```
    npm run build
    ```