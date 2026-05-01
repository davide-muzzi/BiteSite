<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const footerVariant = computed(() => route.name === 'home' ? 'simple' : 'default');
const isWebsite = computed(() => route.name === 'restaurant' ? true : false);
</script>

<template>
  <div class="mobile-wall">
    <div class="mobile-wall__card">
      <span class="mobile-wall__logo">BiteSite</span>
      <div class="mobile-wall__icon">🖥️</div>
      <h1 class="mobile-wall__title">Switch to desktop</h1>
      <p class="mobile-wall__text">
        BiteSite is a web editor designed for larger screens.<br />
        Please open it on a desktop or laptop for the best experience.
      </p>
    </div>
  </div>

  <div class="site-wrapper">
    <NavBar v-if="!isWebsite" />
    <div class="router-wrapper">
      <RouterView />
    </div>
    <Footer :variant="footerVariant" v-if="!isWebsite" />
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

/* Mobile wall — hidden on desktop, shown on small screens */
.mobile-wall {
  display: none;
}

@media (max-width: 900px) {
  .mobile-wall {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: var(--background);
    padding: 2rem;
    margin-right: 2rem;
    margin-left: -2rem;
    margin-top: -8rem;
  }

  .mobile-wall__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;
    max-width: 320px;
  }

  .mobile-wall__logo {
    font-family: var(--font), sans-serif;
    font-size: 2rem;
    font-weight: 900;
    color: var(--accent);
  }

  .mobile-wall__icon {
    font-size: 3rem;
    line-height: 1;
    opacity: 0.85;
  }

  .mobile-wall__title {
    font-family: var(--font), sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--font-color-dark-blue);
    margin: 0;
  }

  .mobile-wall__text {
    font-family: var(--font), sans-serif;
    font-size: 0.95rem;
    color: #6b6b8a;
    line-height: 1.6;
    margin: 0;
  }
}
</style>
