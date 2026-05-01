<script setup>
import { computed } from "vue";

import EditorComponent from './EditorComponent.vue';
import ComponentPopup from './ComponentPopup.vue';

const props = defineProps(["website", "page"]);
const emit = defineEmits(["selectElement"]);

const selectedPage = computed(() => props.website.pages[props.page]);
</script>

<template>
  <div class="sidebar">
    <EditorComponent
      :component="website.navbar"
      disableDelete="true"
      @selectElement="(id) => emit('selectElement', id)"
    />
    <EditorComponent
      :component="component"
      v-for="(component, index) of selectedPage.components"
      @selectElement="(id) => emit('selectElement', id)"
      @delete="selectedPage.components.splice(index, 1)"
    />
    <ComponentPopup @addComponent="(component) => website.pages[page].components.push(component)"/>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
