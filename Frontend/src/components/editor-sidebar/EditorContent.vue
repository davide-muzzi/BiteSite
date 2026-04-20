<script setup>
import { ref, computed } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

const props = defineProps(["content", "openContent"]);

const emit = defineEmits(["open"]);

const isOpen = computed(() => props.openContent === props.content.name);
</script>

<template>
  <div class="content-dropdown">
    <button
      class="dropdown-header"
      :class="{ 'open': isOpen }"
      @click="emit('open', content.name)"
    >
      <div>{{ content.name }}</div>
      <div class="eye-icons" @click.prevent="content.hidden = !content.hidden">
        <EyeOff v-if="content.hidden === true"/>
        <Eye v-else/>
      </div>
    </button>
    <div class="content-input" v-if="isOpen">
      <div v-if="content.type === 'text'">
        <label>Text:</label>
        <input v-model="content.text" type="text" />

        <label>Size:</label>
        <input v-model="content.fontSize" type="number" />

        <label>Weight:</label>
        <input v-model="content.fontWeight" type="number" />

        <label>Color:</label>
        <input v-model="content.fontColor" type="color" />

        <label>Font</label>
        <select v-model="content.fontFamily">
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Verdana</option>
        </select>
      </div>
      <div v-if="content.type === 'picture'">
        <label>Image URL</label>
        <input v-model="backgroundImage" type="text" placeholder="Enter image path" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-dropdown {
  width: 100%;
  display: grid;
}


.content-dropdown > * {
  font-weight: 600;
  color: var(--font-color-dark-blue);
  position: relative;
  grid-area: 1/1;
}

.dropdown-header {
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
  padding: 0 10px;
  height: 34px;
  border-radius: 17px;
  z-index: 9;
}

.dropdown-header.open {
  background-color: var(--accent);
}

.dropdown-header.open * {
  color: white;
}

.eye-icons {
  height: 20px;
  width: 20px;
}

.eye-icons .lucide {
  width: 20px;
  height: 20px;
}

.content-input {
  border-radius: 17px;
  background-color: var(--dropdown-color);
  z-index: 1;
  padding: 10px;
  padding-top: 44px;
}

.content-input > div {
  display: flex;
  flex-direction: column;
}
</style>
