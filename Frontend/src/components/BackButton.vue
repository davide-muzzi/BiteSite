<script setup>
import { ChevronLeft } from "lucide-vue-next";

const emit = defineEmits(["click"]);

function handleClick(event) {
    emit("click", event);

    if (!event.defaultPrevented) {
        window.history.back();
    }
}
</script>

<template>
    <button class="back" type="button" v-bind="$attrs" @click="handleClick">
        <ChevronLeft class="icon" />
        <span>
            <slot>Back</slot>
        </span>
    </button>
</template>

<style scoped>
.back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 25px;
    cursor: pointer;
    width: fit-content;
    border: none;
    background: transparent;
    color: var(--font-color-dark-blue);
    font-family: var(--font);
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    padding: 0;
}

.back:focus-visible {
    outline: 2px solid var(--font-color-dark-blue);
    outline-offset: 4px;
}

.icon {
    width: 18px;
    height: 18px;
}
</style>
