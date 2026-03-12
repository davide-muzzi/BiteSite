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
<!-- 20% ChatGPT -->
    <div class="editor-dropdown">
        <button class="dropdown-header" @click="isOpen = !isOpen">
            <span class="icon">{{ isOpen ? '∨ ' : '> ' }}</span>
            <span class="title">{{ title }}</span>
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


.dropdown-header {
    width: 266px;
    height: 48px;
    border-radius: 66px;
    border: none;
    background-color: var(--accent);
    color: white;
    font-family: var(--font);
    font-weight: 600;
    font-size: 22 px;
}





</style>