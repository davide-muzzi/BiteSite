<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const footerVariant = computed(() => (route.name === 'home' ? 'simple' : 'default'));
</script>

<template>
    <div class="site-wrapper">
        <NavBar />
        <div class="router-wrapper">
            <RouterView />
        </div>
        <Footer :variant="footerVariant" />
    </div>
</template>

<style scoped>
.site-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.router-wrapper {
    flex: 1;
}
</style>
