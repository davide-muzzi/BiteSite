<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const websiteSrc = ref(`${import.meta.env.VITE_API_URL}/restaurants/website/${route.params.route}`);
</script>
<template>
  <iframe :src="websiteSrc" frameborder="0"></iframe>
</template>
<style scoped>
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
