<script setup>
import { reactive } from 'vue'

const titleSettings = reactive({
  text: 'Best Food For Your Taste',
  size: 47,
  weight: 800,
  color: '#ffffff',
  font: 'Times New Roman'
})
</script>

<template>
    <div class="field-group">
      <input v-model="titleSettings.text" type="text" />

      <label>Size: {{ titleSettings.size }}</label>
      <input v-model="titleSettings.size" type="number" />

      <label>Weight: {{ titleSettings.weight }}</label>
      <input v-model="titleSettings.weight" type="number" />

      <label>Color</label>
      <input v-model="titleSettings.color" type="color" />

      <label>Font</label>
      <select v-model="titleSettings.font">
        <option>Arial</option>
        <option>Times New Roman</option>
        <option>Verdana</option>
      </select>
    </div>
</template>

<style scoped>
.field-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

input,
select {
    padding: 8px;
    border: 1px solid #999;
    border-radius: 8px;
}
</style>