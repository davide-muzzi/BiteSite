<script setup>
import { ref } from 'vue';
const loggedIn = ref(true)
</script>

<template>
<div class="top">
    <h1 class="title">BiteSite</h1>
    <div v-if="loggedIn">
      <div class="navbar-items">
        <h2>Overview</h2>
        <h2>Restaurants</h2>
        <h2>Benutzer</h2>
      </div>
    </div>
    <div v-else>
      <div class="navbar-items">
        <h2>What BiteSite offers</h2>
        <h2>Restaurants</h2>
        <h2>
          <RouterLink to="/login" class="routerlink-navbar">Login</RouterLink>
        </h2>      
      </div>
    </div>
</div>
</template>

<style>

.routerlink-navbar {
      color: var(--font-color-dark-blue);
text-decoration: none;
}

.title {
    color: var(--accent);
    cursor: pointer;
}

.top {
    padding-left: 50px;
    display: flex;
    gap: 30px;
    align-items: baseline;
    font-family: var(--font);
    cursor: pointer;

    position: relative;
    z-index: 10;
}

.navbar-items {
    display: flex;
    gap: 30px;
    color: var(--font-color-dark-blue);
    cursor: pointer;
    font-size: 13px;
}
</style>