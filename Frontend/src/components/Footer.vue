<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
});

const isSimple = computed(() => props.variant === "simple");
</script>

<template>
  <footer :class="['site-footer', isSimple ? 'simple' : 'default']">
    <template v-if="isSimple">
      <div class="simple-footer">
        <span>© 2026 BiteSite</span>
        <span>About · Legal · Contact</span>
      </div>
    </template>
    <template v-else>
      <div class="footer-content">
        <div class="brand">
          <h2>BiteSite</h2>
          <p>Create, launch, and grow standout restaurant websites.</p>
        </div>

        <nav class="links">
          <a href="#">About</a>
          <a href="#">Legal</a>
          <a href="#">Contact</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <span>© 2026 BiteSite</span>
        <span>Made with care for hospitality teams</span>
      </div>
    </template>
  </footer>
</template>

<style scoped>
.site-footer {
  font-family: var(--font);
}

.site-footer.default {
  background: #1b133d;
  color: white;
  padding: 48px 60px;
}

.site-footer.simple {
  background: transparent;
  color: var(--font-color-dark-blue);
  padding: 32px 40px 48px;
  text-align: center;
}

.simple-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 15px;
  font-weight: 600;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding-bottom: 28px;
  margin-bottom: 24px;
}

.brand h2 {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 800;
}

.brand p {
  margin: 0;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
}

.links {
  display: flex;
  gap: 18px;
  font-weight: 700;
}

.links a {
  color: white;
  text-decoration: none;
  font-size: 15px;
  transition: opacity 0.2s ease;
}

.links a:hover {
  opacity: 0.7;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
