<script setup>
import { computed } from "vue";

import EditorComponent from './EditorComponent.vue'

const props = defineProps(["website", "page"])

const selectedPage = computed(() => props.website.pages.find(page => page.name == props.page));
</script>

<template>
  <div class="sidebar">
    <EditorComponent :component="website.navbar"/>
    <EditorComponent :component="component" v-for="component of selectedPage.components"/>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
