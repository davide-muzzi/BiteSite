<script setup>
import { computed } from "vue";

import EditorComponent from './EditorComponent.vue'

const props = defineProps(["website", "page"]);
const emit = defineEmits(["selectElement"]);

const selectedPage = computed(() => props.website.pages.find(page => page.name == props.page));
</script>

<template>
  <div class="sidebar">
    <EditorComponent
      :component="website.navbar"
        @selectElement="(id) => emit('selectElement', id)"
    />
    <EditorComponent
      :component="component"
      v-for="component of selectedPage.components"
      @selectElement="(id) => emit('selectElement', id)"
    />
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
