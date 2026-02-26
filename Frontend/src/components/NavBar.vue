<script setup>
import { ref } from 'vue';
const loggedIn = ref(true)
</script>

<template>
<div class="top">
    <h1 class="logo">BiteSite</h1>
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
        <h2>Login</h2>
      </div>
    </div>
</div>
</template>

<style>
.logo{
    color: var(--accent);
    cursor: pointer;
}
.top{
    padding-left: 50px;
    display: flex;
    gap: 30px;
    align-items: baseline;
    font-family: var(--font);
    cursor: pointer;
}

.navbar-items{
    display: flex;
    gap: 30px;
    color: var(--font-color-dark-blue);
    cursor: pointer;
    font-size: 13px;
}
</style>