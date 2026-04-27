<script setup>
import { ref, computed } from "vue";
import {
  Eye,
  EyeOff,
  ChevronRight,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  ArrowDownUp,
  ArrowLeftRight,
} from "lucide-vue-next";

const props = defineProps(["content", "openContent"]);

const emit = defineEmits(["open"]);

const supportedFonts = ref(["Arial", "Verdena", "Times New Roman", "Comic Sans"]);
const fontDropdownOpen = ref(false);
const isOpen = computed(() => props.openContent === props.content.name);

const toggleDropdown = (_, font) => {
  if (font)
    props.content.style.fontFamily = font

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
      <div
        class="eye-icons"
        v-if="'hidden' in content"
        @click.stop="content.hidden = !content.hidden"
      >
        <EyeOff v-if="content.hidden === true"/>
        <Eye v-else/>
      </div>
    </button>
    <div class="content-input" v-if="isOpen">
      <div v-if="content.types.includes('text')">
        <div v-if="!content.types.includes('ro-text')">
          <label>Text:</label>
          <input v-model="content.text" type="text" />
        </div>

        <div>
          <label>Size:</label>
          <input v-model="content.style.fontSize" type="text" />
        </div>

        <div>
          <label>Weight:</label>
          <input v-model="content.style.fontWeight" type="number" />
        </div>

        <div>
          <label>Color:</label>
          <div class="color-input">
            <input v-model="content.style.color" type="color" />
            <input v-model="content.style.color" type="text"/>
          </div>
        </div>

        <div>
          <label>Font:</label>
          <div class="font-dropdown">
            <div
              :style="{ fontFamily: content.style.fontFamily }"
              @click="toggleDropdown"
            >
              <ChevronRight :class="{ 'open': fontDropdownOpen }"/>
              <div>{{ content.style.fontFamily }}</div>
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
      <div v-if="content.types.includes('picture')">
        <label>Image URL:</label>
        <input v-model="backgroundImage" type="text" placeholder="Enter image path" />
      </div>
      <div v-if="content.types.includes('container')">
        <div>
          <label>Width:</label>
          <input v-model="content.style.width" type="text">
        </div>
        <div>
          <label>Height:</label>
          <input v-model="content.style.height" type="text">
        </div>
        <div>
          <label>Gap:</label>
          <input v-model="content.style.gap" type="text">
        </div>
        <div>
          <label>Padding:</label>
          <input v-model="content.style.padding" type="text">
        </div>
        <div>
          <label>Background color:</label>
          <div class="color-input">
            <input v-model="content.style.backgroundColor" type="color" />
            <input v-model="content.style.backgroundColor" type="text"/>
          </div>
        </div>
        <div>
          <label>Horizontal Align:</label>
          <div class="radio-input align-radio">
            <button
              :class="{ 'selected': content.style.justifyContent === 'left' }"
              @click="content.style.justifyContent = 'left'"
            >
              <AlignStartVertical/>
            </button>
            <button
              :class="{ 'selected': content.style.justifyContent === 'center' }"
              @click="content.style.justifyContent = 'center'"
            >
              <AlignCenterVertical/>
            </button>
            <button
              :class="{ 'selected': content.style.justifyContent === 'right' }"
              @click="content.style.justifyContent = 'right'"
            >
              <AlignEndVertical/>
            </button>
          </div>
        </div>
        <div>
          <label>Vertical Align:</label>
          <div class="radio-input align-radio">
            <button
              :class="{ 'selected': content.style.alignItems === 'top' }"
              @click="content.style.alignItems = 'top'"
            >
              <AlignVerticalJustifyStart/>
            </button>
            <button
              :class="{ 'selected': content.style.alignItems === 'center' }"
              @click="content.style.alignItems = 'center'"
            >
              <AlignVerticalJustifyCenter/>
            </button>
            <button
              :class="{ 'selected': content.style.alignItems === 'bottom' }"
              @click="content.style.alignItems = 'bottom'"
            >
              <AlignVerticalJustifyEnd/>
            </button>
          </div>
        </div>
        <div>
          <label>Item Flow:</label>
          <div class="radio-input flow-radio">
            <button
              :class="{ 'selected': content.style.flexDirection === 'row' }"
              @click="content.style.flexDirection = 'row'"
            >
              <ArrowLeftRight/>
            </button>
            <button
              :class="{ 'selected': content.style.flexDirection === 'column' }"
              @click="content.style.flexDirection = 'column'"
            >
              <ArrowDownUp/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="content.types.includes('bar')">
        <div>
          <label>Height:</label>
          <input v-model="content.style.height" type="text">
        </div>
        <div>
          <label>Background color:</label>
          <div class="color-input">
            <input v-model="content.style.backgroundColor" type="color" />
            <input v-model="content.style.backgroundColor" type="text"/>
          </div>
        </div>
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

.radio-input {
  background-color: var(--dropdown-color);
  border: 2px solid var(--font-color-dark-blue);
  border-radius: 5px;
  overflow: hidden;
  height: 40px;
}

.radio-input .lucide {
  color: var(--font-color-dark-blue);
}

.radio-input button {
  height: 100%;
  aspect-ratio: 1/1;
  background-color: var(--dropdown-color);
  border-radius: 5px;
}

.radio-input button:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.radio-input button:last-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.radio-input button:hover {
  background-color: color-mix(in srgb, var(--font-color-dark-blue) 20%, transparent);
}

.radio-input button.selected {
  background-color: var(--font-color-dark-blue);
}

.radio-input button.selected .lucide {
  color: var(--dropdown-color);
}

.align-radio {
  width: 120px;
}

.flow-radio {
  width: 80px;
}
</style>
