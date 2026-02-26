<script setup>
import router from '@/router';


</script>

<template>

    <button class="back-button">
        <RouterLink to="/login">< Back</RouterLink>
    </button>

    <div class="account-page">
        <router-view />
    </div>
</template>

<style scoped>
body {
  background: var(--background);
  font-family: var(--font);
  color: var(--font-color-dark-blue);
}

.account-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.back-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: var(--font-color-dark-blue);
    font-weight: 600;
    margin-left: 70px;
    font-family: var(--font);
}

.back-button > a {
    text-decoration: none;
}
</style>