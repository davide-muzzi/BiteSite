<script setup>
import { ref, computed } from "vue";
import { Eye, EyeOff, ChevronRight } from "lucide-vue-next";

const props = defineProps(["content", "openContent"]);

const emit = defineEmits(["open"]);

const supportedFonts = ref(["Arial", "Verdena", "Times New Roman", "Comic Sans"]);
const fontDropdownOpen = ref(false);
const isOpen = computed(() => props.openContent === props.content.name);

const toggleDropdown = (_, font) => {
  if (font)
    props.content.fontFamily = font

  fontDropdownOpen.value = !fontDropdownOpen.value
}
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
        <div>
          <label>Text:</label>
          <input v-model="content.text" type="text" />
        </div>

        <div>
          <label>Size:</label>
          <input v-model="content.fontSize" type="number" />
        </div>

        <div>
          <label>Weight:</label>
          <input v-model="content.fontWeight" type="number" />
        </div>

        <div>
          <label>Color:</label>
          <div class="color-input">
            <input v-model="content.fontColor" type="color" />
            <input v-model="content.fontColor" type="text"/>
          </div>
        </div>

        <div>
          <label>Font:</label>
          <div class="font-dropdown">
            <div
              :style="{ fontFamily: content.fontFamily }"
              @click="toggleDropdown"
            >
              <ChevronRight :class="{ 'open': fontDropdownOpen }"/>
              <div>{{ content.fontFamily }}</div>
            </div>
            <div
              class="dropdown"
              v-if="fontDropdownOpen"
            >
              <div
                :style="{ fontFamily: font }"
                v-for="font of supportedFonts"
                @click="toggleDropdown(_, font)"
              >
                {{ font }}
              </div>
            </div>
          </div>
        </div>
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

.content-input input {
  outline: none;
  border: none;
  color: var(--font-color-dark-blue);
  font-weight: 500;
}

.content-input input[type="text"],
.content-input input[type="number"] {
  background-color: var(--background-color);
  border-bottom: 2px solid var(--font-color-dark-blue);
}

.content-input input[type="color"] {
  background-color: var(--font-color-dark-blue);
  padding: 1px;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  cursor: pointer;
}

.content-input input[type="color"]::-moz-color-swatch,
.content-input input[type="color"]::-webkit-color-swatch {
  border-radius: 4px;
  border: none;
  width: 92%;
  height: 92%;
}

.content-input > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.content-input > div > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.color-input {
  display: flex;
  align-items: center;
  gap: 5px;
}

.color-input input[type="text"] {
  flex: 1;
}

.font-dropdown {
  position: relative;
  display: grid;
}

.font-dropdown > div {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-color-dark-blue);
  background-color: var(--dropdown-color);
  grid-area: 1/1;
}

.font-dropdown > div:first-child {
  height: 30px;
  border-radius: 17px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 8;
  padding: 0 10px;
}

.font-dropdown .lucide {
  width: 17px;
  height: 17px;
  transition: 0.05s;
}

.font-dropdown .lucide.open {
  transform: rotate(90deg);
}

.font-dropdown > .dropdown {
  padding: 10px;
  padding-top: 35px;
  border-radius: 17px;
  z-index: 3;
}

.font-dropdown > .dropdown > div {
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding-left: 5px;
}

.font-dropdown > .dropdown > div:hover {
  background-color: color-mix(in srgb, var(--font-color-dark-blue) 20%, transparent);
}
</style>
