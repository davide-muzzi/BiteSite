<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    
})

</script>

<template>
    <button class="edit-nav">
        
    </button>
</template>

<style scoped>
    .edit-nav {
        background-color: var(--accent);
    }
</style>