<script setup lang="ts">
// import { ref } from 'vue'
// import { useStore } from '../store/index'
import dm from '../utils/dm'

async function send (): Promise<void> {
// 打开软件
    const ret = await dm.runApp('cloudmusic', 1)
    console.log(ret)
}

defineProps<{ msg: string }>()

// const c = ref(0)
// const store = useStore()
// console.log(c.value, store.count)
</script>

<template>
    <button
        type="button"
        @click="send"
    >
        打开网易云
    </button>
</template>

<style lang="scss" scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}

</style>
