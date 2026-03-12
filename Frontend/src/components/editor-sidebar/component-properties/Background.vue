AI Placeholder!

<script setup>
import { ref } from 'vue'

const backgroundImage = ref('')
</script>

<template>
    <div class="field-group">
      <label>Image URL</label>
      <input v-model="backgroundImage" type="text" placeholder="Enter image path" />
    </div>
</template>

<style scoped>
.field-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
}

input {
    padding: 8px;
    border: 1px solid #999;
    border-radius: 8px;
}
</style>