<template>
  <nav class="nav">
    <RouterLink to="/" class="logo">BiteSite</RouterLink>

    <div class="nav-links">
      <RouterLink to="/top-restaurants" class="nav-link">Restaurants</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#about' }" class="nav-link">About Us</RouterLink>
      <RouterLink to="/login" class="nav-link">Login</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  padding: 32px 50px 0;
  display: flex;
  gap: 36px;
  align-items: center;
  font-family: var(--font);
  position: relative;
  z-index: 10;
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
</style>
