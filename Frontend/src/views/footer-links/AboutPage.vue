<template>
  <div class="about-page">

    <!-- Page header -->
    <section class="page-header">
      <p class="eyebrow">Who we are</p>
      <h1>About BiteSite</h1>
      <p class="lead">We believe every restaurant deserves a digital presence as unique and flavorful as the dishes it serves.</p>
    </section>

    <!-- Mission -->
    <section class="section alt">
      <div class="content-block">
        <div class="text">
          <p class="eyebrow">Our mission</p>
          <h2>Built for the world of gastronomy</h2>
          <p>No generic templates, no complicated setup, no expensive agencies. BiteSite gives restaurants powerful tools to shine online — from updating a menu and showcasing the dining room atmosphere to promoting daily specials.</p>
          <p>Everything is simple, fast, and designed to save time so you can focus on what actually matters: your food and your guests.</p>
        </div>
        <div class="accent-block">
          <span>"Your food is your passion.<br />Making it look great online is ours."</span>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section">
      <p class="eyebrow centered">What drives us</p>
      <h2 class="centered">Our values</h2>
      <div class="values-grid">
        <div class="value-card">
          <h3>Simplicity</h3>
          <p>Complex technology shouldn't be a barrier. We make powerful tools accessible to everyone.</p>
        </div>
        <div class="value-card">
          <h3>Hospitality</h3>
          <p>We treat every customer the way a great restaurant treats its guests — with care and attention.</p>
        </div>
        <div class="value-card">
          <h3>Quality</h3>
          <p>From our templates to our support, we hold ourselves to the same standard your kitchen does.</p>
        </div>
      </div>
    </section>

    <!-- Closing -->
    <section class="section alt closing">
      <p class="closing-text">BiteSite stands for websites that taste as good as they look.</p>
    </section>

  </div>
</template>

<style scoped>
.about-page {
  font-family: var(--font);
}

/* ── Page header ── */
.page-header {
  background: var(--background);
  text-align: center;
  padding: 80px 80px 72px;
}

.page-header h1 {
  font-size: clamp(36px, 4vw, 60px);
  font-weight: 800;
  color: var(--font-color-dark-blue);
  margin: 0 0 20px;
}

.lead {
  font-size: 18px;
  color: #6b6b8a;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.65;
}

/* ── Shared ── */
.section {
  padding: 80px;
  background: var(--background);
}

.section.alt {
  background: white;
}

.eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 16px;
}

.eyebrow.centered {
  text-align: center;
}

h2 {
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 800;
  color: var(--font-color-dark-blue);
  margin: 0 0 24px;
}

h2.centered {
  text-align: center;
  margin-bottom: 48px;
}

/* ── Mission ── */
.content-block {
  display: flex;
  align-items: center;
  gap: 64px;
  max-width: 1100px;
  margin: 0 auto;
}

.text {
  flex: 1;
}

.text p {
  font-size: 16px;
  color: #6b6b8a;
  line-height: 1.7;
  margin: 0 0 16px;
}

.text p:last-child {
  margin-bottom: 0;
}

.accent-block {
  flex: 0 0 300px;
  background: var(--background);
  border-left: 4px solid var(--accent);
  border-radius: 12px;
  padding: 36px 32px;
  font-size: 18px;
  font-weight: 700;
  color: var(--font-color-dark-blue);
  line-height: 1.55;
}

/* ── Values ── */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.value-card {
  background: white;
  border-radius: 16px;
  padding: 36px 28px;
  box-shadow: 0 4px 24px rgba(49, 38, 110, 0.07);
}

.value-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--font-color-dark-blue);
  margin: 0 0 12px;
}

.value-card p {
  font-size: 14px;
  color: #6b6b8a;
  line-height: 1.65;
  margin: 0;
}

/* ── Closing ── */
.closing {
  text-align: center;
  padding: 72px 80px;
}

.closing-text {
  font-size: clamp(20px, 2.5vw, 30px);
  font-weight: 800;
  color: var(--font-color-dark-blue);
  margin: 0;
}
</style>
