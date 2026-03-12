<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    startOpen: {
        type: Boolean,
        default: false
    }
    
})

const isOpen = ref(props.startOpen);

</script>

<template>
    <div class="editor-dropdown">
        <button class="dropdown-header" @click="isOpen = !isOpen">
            <span class="title">{{ title }}</span>
            <span class="icon">{{ isOpen ? '⌃' : '⌄' }}</span>
        </button>

        <div v-if="isOpen" class="dropdown-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.editor-dropdown {
    margin-bottom: 20px;
}
.dropdowm-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 15px;
    background-color: var(--dropdown-color);
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.button {
    width: 100%;
    height: 64px;
    border-radius: 999px;
    border: none;
    background-color: var(--accent);
    color: white;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}
</style>