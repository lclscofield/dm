<script setup lang="ts">
import { ref } from 'vue'
// import { useStore } from '../store/index'
import dm from '../utils/dm'

const send = () => {
    dm('MoveTo', [0, 0])
}

defineProps<{ msg: string }>()

const c = ref(0)
// const store = useStore()
// console.log(c.value, store.count)
</script>

<template>
    <h1>{{ msg }}</h1>

    <p>
        Recommended IDE setup:
        <a
            href="https://code.visualstudio.com/"
            target="_blank"
        >VSCode</a>
        +
        <a
            href="https://github.com/johnsoncodehk/volar"
            target="_blank"
        >Volar</a>
    </p>

    <p>
        See
        <code>README.md</code> for more information.
    </p>

    <p>
        <a
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
        >Vite Docs</a>
        |
        <a
            href="https://v3.vuejs.org/"
            target="_blank"
        >Vue 3 Docs</a>
    </p>

    <button
        type="button"
        @click="send"
    >
        count is: {{ c }}
    </button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>

    <div class="xx">
        <div class="xx-aa">
            123
        </div>
    </div>
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

.xx {
    &-aa {
        color: #42b983;
    }
}
</style>
