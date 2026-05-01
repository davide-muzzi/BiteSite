<script setup>
import { computed } from "vue";

import EditorComponent from './EditorComponent.vue';
import ComponentPopup from './ComponentPopup.vue';

const props = defineProps(["website", "page"]);
const emit = defineEmits(["selectElement"]);

const handleSelectElement = (element, componentIndex) => {
  emit("selectElement",
  `${element.id}-${props.website.pages[props.page].name.toLowerCase()}-${componentIndex}-${element.contentIndex}`);
}

const selectedPage = computed(() => props.website.pages[props.page]);
</script>

<template>
  <div class="sidebar">
    <EditorComponent
      :component="website.navbar"
      disableDelete="true"
      @selectElement="handleSelectElement"
    />
    <EditorComponent
      :component="component"
      v-for="(component, index) of selectedPage.components"
      @selectElement="(element) => handleSelectElement(element, index)"
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
