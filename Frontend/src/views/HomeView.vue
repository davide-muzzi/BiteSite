<script setup>
import router from "@/router";
import { checkLogin } from "@/api/routes/user.js";
import { onMounted, ref } from "vue";
import { Star } from "lucide-vue-next";

const loggedIn = ref("");

onMounted(async () => {
  const result = await checkLogin();
  loggedIn.value = result.loggedIn;
});
</script>

<template>
  <!-- Hero -->
  <section class="hero">
    <div class="hero-text">
      <p class="eyebrow">Restaurant website builder</p>
      <h1 class="hero-headline">Your restaurant,<br />online — beautifully.</h1>
      <p class="hero-sub">
        Create and host your custom restaurant website at low cost and little effort.
        No coding, no agencies, no hassle.
      </p>
      <div class="hero-actions">
        <button class="btn-primary" @click="router.push(loggedIn ? '/projects-overview' : '/register')">
          Get Started
        </button>
        <button class="btn-ghost" @click="router.push('/top-restaurants')">
          Browse Restaurants
        </button>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-image-frame">
        <!-- Replace this div with <img src="..." alt="..." /> once you have the image -->
        <div class="hero-image-placeholder">
          <span>Add your image here</span>
        </div>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section class="section how-it-works">
    <p class="eyebrow">Simple by design</p>
    <h2 class="section-title">How it works</h2>
    <div class="steps">
      <div class="step">
        <div class="step-number">01</div>
        <h3>Create your account</h3>
        <p>Sign up in seconds and set up your first project right away.</p>
      </div>
      <div class="step-divider" />
      <div class="step">
        <div class="step-number">02</div>
        <h3>Pick a template</h3>
        <p>Choose from our professional restaurant templates or start from scratch.</p>
      </div>
      <div class="step-divider" />
      <div class="step">
        <div class="step-number">03</div>
        <h3>Go live</h3>
        <p>Publish your site instantly. Update menus, hours, and more anytime.</p>
      </div>
    </div>
  </section>

  <!-- Why BiteSite -->
  <section class="section why-bitesite">
    <p class="eyebrow">Built for restaurants</p>
    <h2 class="section-title">Why BiteSite?</h2>
    <div class="features">
      <div class="feature-card">
        <Star class="feature-icon" :size="22" />
        <h3>No coding required</h3>
        <p>Our intuitive editor lets anyone build a professional site — no tech knowledge needed.</p>
      </div>
      <div class="feature-card">
        <Star class="feature-icon" :size="22" />
        <h3>Ready-made templates</h3>
        <p>Start from a curated restaurant template or build a fully custom design from scratch.</p>
      </div>
      <div class="feature-card">
        <Star class="feature-icon" :size="22" />
        <h3>Effortless hosting</h3>
        <p>We handle the technical side. Your site goes live instantly, always fast and secure.</p>
      </div>
      <div class="feature-card">
        <Star class="feature-icon" :size="22" />
        <h3>Easy to use</h3>
        <p>Designed for hospitality teams, not developers. Update your content in minutes.</p>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="section cta-section">
    <h2 class="cta-title">Ready to get your restaurant online?</h2>
    <p class="cta-sub">Join restaurants already growing with BiteSite.</p>
    <button class="btn-primary cta-btn" @click="router.push(loggedIn ? '/projects-overview' : '/register')">
      Start Now
    </button>
  </section>
</template>

<style scoped>
/* ── Hero ── */
.hero {
  display: flex;
  align-items: center;
  min-height: calc(100vh - 72px);
  padding: 0 80px;
  gap: 60px;
  background: var(--background);
}

.hero-text {
  flex: 1;
  max-width: 580px;
}

.eyebrow {
  font-family: var(--font);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 20px;
}

.hero-headline {
  font-family: var(--font);
  font-size: clamp(40px, 4.5vw, 66px);
  font-weight: 800;
  line-height: 1.1;
  color: var(--font-color-dark-blue);
  margin: 0 0 24px;
}

.hero-sub {
  font-family: var(--font);
  font-size: 18px;
  font-weight: 400;
  color: #6b6b8a;
  line-height: 1.65;
  margin: 0 0 40px;
  max-width: 460px;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-frame {
  width: 100%;
  max-width: 540px;
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(49, 38, 110, 0.15);
}

.hero-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--card-color) 0%, #ffd6b0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b08060;
  font-family: var(--font);
  font-size: 15px;
  font-weight: 600;
}

/* ── Buttons ── */
.btn-primary {
  background: var(--accent);
  color: white;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  padding: 16px 36px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: var(--button-hover-color);
}

.btn-ghost {
  background: transparent;
  color: var(--font-color-dark-blue);
  font-family: var(--font);
  font-size: 16px;
  font-weight: 600;
  border: 2px solid var(--font-color-dark-blue);
  border-radius: 50px;
  padding: 14px 34px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: var(--font-color-dark-blue);
  color: white;
}

/* ── Sections shared ── */
.section {
  padding: 100px 80px;
  font-family: var(--font);
}

.section-title {
  font-size: clamp(32px, 3vw, 48px);
  font-weight: 800;
  color: var(--font-color-dark-blue);
  text-align: center;
  margin: 0 0 64px;
}

/* ── How it works ── */
.how-it-works {
  background: white;
  text-align: center;
}

.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 960px;
  margin: 0 auto;
}

.step {
  flex: 1;
  padding: 0 40px;
}

.step-number {
  font-size: 52px;
  font-weight: 900;
  color: var(--accent);
  opacity: 1;
  line-height: 1;
  margin-bottom: 20px;
}

.step h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--font-color-dark-blue);
  margin: 0 0 12px;
}

.step p {
  font-size: 15px;
  color: #6b6b8a;
  line-height: 1.6;
  margin: 0;
}

.step-divider {
  width: 1px;
  height: 80px;
  background: rgba(49, 38, 110, 0.15);
  flex-shrink: 0;
}

/* ── Why BiteSite ── */
.why-bitesite {
  background: var(--background);
  text-align: center;
}

.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 36px 28px;
  text-align: left;
  box-shadow: 0 4px 24px rgba(49, 38, 110, 0.07);
}

.feature-icon {
  color: var(--accent);
  margin-bottom: 18px;
  display: block;
}

.feature-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--font-color-dark-blue);
  margin: 0 0 10px;
}

.feature-card p {
  font-size: 14px;
  color: #6b6b8a;
  line-height: 1.65;
  margin: 0;
}

/* ── CTA ── */
.cta-section {
  background: var(--font-color-dark-blue);
  text-align: center;
}

.cta-title {
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 800;
  color: white;
  margin: 0 0 16px;
}

.cta-sub {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 40px;
}

.cta-btn {
  font-size: 17px;
  padding: 18px 48px;
}

.cta-btn:hover {
  background: #c0032f;
}
</style>
