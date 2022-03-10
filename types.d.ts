/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production'
        readonly VITE_DEV_SERVER_HOST: string
        readonly VITE_DEV_SERVER_PORT: string
    }
}
declare module 'winax' {
    interface Object {
        new (COM: string): any;
    }
    const Object: any
    class Variant {
        constructor(val?: any, type?: string);
        assign(val: any): void;
        cast(type: string): void;
        clear(): void;
    }
}
