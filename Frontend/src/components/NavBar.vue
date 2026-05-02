<script setup>
import { checkLogin } from "@/api/routes/user.js";
import { onMounted, ref } from "vue";

const loggedIn = ref("");

onMounted(async () => {
  const result = await checkLogin();

  loggedIn.value = result.loggedIn;
})
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="logo">BiteSite</RouterLink>

    <div class="nav-links">
      <RouterLink to="/top-restaurants" class="nav-link">Restaurants</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
      <RouterLink to="/login" class="nav-link" v-if="!loggedIn">Login</RouterLink>
      <RouterLink to="/user-settings" class="nav-link" v-else>Settings</RouterLink>
      <RouterLink to="/projects-overview" class="nav-link" v-if="loggedIn">Projects</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  padding: 20px 50px;
  display: flex;
  gap: 36px;
  align-items: center;
  font-family: var(--font);
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 1px solid rgba(49, 38, 110, 0.08);
  box-shadow: 0 2px 16px rgba(49, 38, 110, 0.06);
}

.logo {
  font-size: 36px;
  font-weight: 900;
  color: var(--accent);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 26px;
}

.nav-link {
  color: var(--font-color-dark-blue);
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
}

.nav-link.disabled {
  cursor: default;
}
</style>
