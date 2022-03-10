module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        'vue/setup-compiler-macros': true,
    },
    parser: 'vue-eslint-parser', // 定义ESLint的解析器
    extends: [
        'plugin:vue/vue3-recommended',
        'standard',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: {
            ts: '@typescript-eslint/parser',
        },
        sourceType: 'module',
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        // indent: ['error', 4],
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        // vue
        'vue/no-multiple-template-root': 'off',
        'vue/html-indent': ['error', 4],
    },
}
