<script setup>
import { ref } from 'vue';
import { ChevronRight } from "lucide-vue-next";

import EditorContent from "./EditorContent.vue";

const props = defineProps(["component"])

const isOpen = ref(false);
const openContent = ref("");

const changeOpenContent = (name) => {
  if (openContent.value === name) {
    openContent.value = "";
  } else {
    openContent.value = name;
  }
}
</script>

<template>
    <div class="component-dropdown">
        <button class="dropdown-header" @click="isOpen = !isOpen">
            <ChevronRight class="chevron-icon" :class="{ 'open': isOpen }"/>
            <div>{{ component.name }}</div>
        </button>

        <div class="dropdown-content" :class="{ 'open': isOpen }">
            <EditorContent
              :content="content"
              :openContent="openContent"
              v-for="content of component.content"
              v-if="isOpen"
              @open="changeOpenContent"
            />
        </div>
    </div>
</template>

<style scoped>
.component-dropdown {
    width: 100%;
    display: grid;
}

.component-dropdown > * {
    position: relative;
    grid-area: 1 / 1;
}

.dropdown-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    height: 50px;
    border-radius: 25px;
    border: none;
    background-color: var(--accent);
    color: white;
    font-family: var(--font);
    font-weight: 600;
    font-size: 22px;
    z-index: 10;
}

.dropdown-content {
  box-sizing: border-box;
  width: 100%;
  z-index: 0;
  max-height: 0;
  transition: 0.05s;
  border-radius: 25px;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dropdown-content.open {
  max-height: unset;
  padding-top: 60px;
}

.chevron-icon {
  transition: 0.05s;
}

.chevron-icon.open {
  transform: rotate(90deg);
}
</style>
