<script setup>
import { ref } from "vue";
import { ChevronRight } from "lucide-vue-next";
import components from "@/assets/components/components.js";

const props = defineProps(["category"]);
const emit = defineEmits(["addComponent"]);

const dropdownOpen = ref(false);

const toggleDropdown = (_, component) => {
  dropdownOpen.value = !dropdownOpen.value;

  if (!component) return;

  emit('addComponent', JSON.parse(JSON.stringify(component)));
}
</script>
<template>
  <div
    class="dropdown-head"
    :class="{ 'open': dropdownOpen }"
    @click="toggleDropdown"
  >
    <ChevronRight/>
    <div>{{ category.name }}</div>
  </div>
  <div
    class="dropdown-body"
    v-if="dropdownOpen"
  >
    <div
      class="component"
      v-for="component of category.components"
      @click="toggleDropdown(_, component)"
    >{{ component.name }}</div>
  </div>
</template>
<style scoped>
.dropdown-head {
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  border-radius: 20px;
  color: white;
  background-color: var(--accent);
  cursor: pointer;
  padding-left: 10px;
  font-weight: 500;
  box-sizing: border-box;
  gap: 5px;
  user-select: none;
}

.dropdown-head .lucide {
  transition: 0.05s;
}

.dropdown-head.open .lucide {
  transform: rotate(90deg);
}

.dropdown-body {
  padding: 10px;
}

.component {
  user-select: none;
  cursor: pointer;
}
</style>
