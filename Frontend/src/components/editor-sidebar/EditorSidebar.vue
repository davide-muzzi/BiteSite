<script setup>
import { computed } from "vue";

import Background from './component-properties/Background.vue'
import Title from './component-properties/Title.vue'
import EditorComponent from './EditorComponent.vue'

const props = defineProps(["project", "page"])

const selectedPage = computed(() => props.project.website.pages.find(page => page.name == props.page));
</script>

<template>
  <div class="sidebar">
    <EditorComponent :title="content.name" v-for="content of selectedPage.content">
      <Background />
    </EditorComponent>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
