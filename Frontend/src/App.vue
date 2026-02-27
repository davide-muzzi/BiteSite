<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue'
</script>

<template>
    <div class="site-wrapper">
        <NavBar />
        <div class="router-wrapper">
            <RouterView />
        </div>
        <Footer />
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
