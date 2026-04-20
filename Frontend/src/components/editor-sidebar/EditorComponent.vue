<script setup>
import { ref } from 'vue';
import { ChevronRight } from "lucide-vue-next";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    startOpen: {
        type: Boolean,
        default: false
    }

})

const isOpen = ref(props.startOpen);

</script>

<template>
    <div class="editor-dropdown">
        <button class="dropdown-header" @click="isOpen = !isOpen">
          <ChevronRight class="chevron-icon" :class="{ 'open': isOpen }"/>
            <span>{{ title }}</span>
        </button>

        <div class="dropdown-content" :class="{ 'open': isOpen }">
            <slot v-if="isOpen" />
        </div>
    </div>
</template>

<style scoped>
.editor-dropdown {
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    display: grid;
}

.editor-dropdown > * {
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
  background-color: var(--dropdown-color);
  box-sizing: border-box;
  width: 100%;
  z-index: 0;
  max-height: 0;
  transition: 0.05s;
  border-radius: 25px;
  padding: 10px;
}

.dropdown-content.open {
  max-height: unset;
  padding-top: 50px;
}

.chevron-icon {
  transition: 0.05s;
}

.chevron-icon.open {
  transform: rotate(90deg);
}
</style>
