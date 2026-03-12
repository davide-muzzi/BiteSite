<script setup>
import { RouterLink } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";

const props = defineProps({
    to: {
        type: [String, Object],
        default: null,
    },
});
</script>

<template>
    <RouterLink v-if="props.to" class="back" :to="props.to" v-bind="$attrs">
        <ChevronLeft class="icon" />
        <span><slot>Back</slot></span>
    </RouterLink>
    <button v-else class="back" type="button" v-bind="$attrs">
        <ChevronLeft class="icon" />
        <span><slot>Back</slot></span>
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
