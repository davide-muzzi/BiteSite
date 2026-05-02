<script setup>
import { Plus } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import components from "@/website-components/components.js";

import ComponentDropdown from "./ComponentDropdown.vue";

const emit = defineEmits(["addComponent"]);

const popupOpen = ref(false);
const popupRef = ref(null);
const triggerRef = ref(null);

const toggleDropdown = () => {
  popupOpen.value = !popupOpen.value;
}

const handleClickOutsidePopup = (event) => {
  if (!popupOpen.value) return;

  if (
    !popupRef.value?.contains(event.target) &&
    !triggerRef.value?.contains(event.target)
  ) {
    toggleDropdown();
  }
}

onMounted(() => {
  window.addEventListener("click", handleClickOutsidePopup);
});
</script>
<template>
  <div class="component-wrapper">
    <button
      class="component-button"
      ref="triggerRef"
      @click="toggleDropdown"
    >
      <Plus/>
      <div>Add</div>
    </button>
    <div
      class="component-popup"
      ref="popupRef"
      v-if="popupOpen"
    >
      <ComponentDropdown
        :category="category"
        v-for="category of components"
        @addComponent="(component) => emit('addComponent', component)"
      />
    </div>
  </div>
</template>
<style scoped>
.component-wrapper {
  width: 100%;
  height: 50px;
  position: relative;
}

.component-button {
  background-color: var(--card-color);
  display: flex;
  color: var(--font-color-dark-blue);
  border: 3px solid var(--font-color-dark-blue);
  justify-content: center;
  font-size: 18px;
  gap: 10px;
  font-weight: 550;
  height: 50px;
  align-items: center;
  border-radius: 25px;
  transition: 0.05s;
  padding: 0;
  width: 100%;
}

.component-button:hover {
  background-color: var(--font-color-dark-blue);
  color: white;
}

.component-popup {
  position: absolute;
  left: 325px;
  top: -70px;
  width: calc((100vw - 350px) - 20px);
  background-color: var(--card-color);
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
