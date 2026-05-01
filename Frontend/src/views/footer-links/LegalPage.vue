<template>
  <div class="legal-page">

    <section class="page-header">
      <p class="eyebrow">Policies &amp; terms</p>
      <h1>Legal</h1>
      <p class="lead">Last updated January 2026</p>
    </section>

    <section class="section">
      <div class="document">

        <div class="legal-block">
          <h2>Terms of Use</h2>
          <p>By accessing and using this website, you agree to comply with all applicable laws and with the terms and conditions outlined here. All content is provided for informational purposes only. We reserve the right to update, modify, or remove any part of the website at any time without prior notice.</p>
        </div>

        <div class="legal-block">
          <h2>Privacy Policy</h2>
          <p>We take the protection of your personal data seriously. Any information you provide — such as through forms or communication — will be handled confidentially and in accordance with applicable data protection regulations. We do not share your data with third parties unless required by law or necessary to provide our services.</p>
        </div>

        <div class="legal-block">
          <h2>Copyright Notice</h2>
          <p>All content on this website, including text, images, graphics, logos, and design elements, is protected by copyright and may not be reproduced, distributed, or used without prior written permission from the copyright owner. Unauthorized use may lead to legal action.</p>
        </div>

        <div class="legal-block">
          <h2>Liability Disclaimer</h2>
          <p>We strive to provide accurate and up-to-date information. However, we make no guarantees regarding completeness, accuracy, or reliability. We are not responsible for any damages arising from the use of this website or reliance on its content.</p>
        </div>

        <div class="legal-block">
          <h2>External Links</h2>
          <p>This website may contain links to external websites. We are not responsible for the content, availability, or security of such third-party pages and do not endorse them.</p>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.legal-page {
  font-family: var(--font);
}

.page-header {
  background: var(--background);
  text-align: center;
  padding: 80px 80px 72px;
}

.page-header h1 {
  font-size: clamp(36px, 4vw, 60px);
  font-weight: 800;
  color: var(--font-color-dark-blue);
  margin: 0 0 12px;
}

.eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 16px;
}

.lead {
  font-size: 15px;
  color: #6b6b8a;
  margin: 0;
}

.section {
  background: white;
  padding: 80px;
}

.document {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.legal-block {
  border-left: 3px solid var(--accent);
  padding-left: 28px;
}

.legal-block h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--font-color-dark-blue);
  margin: 0 0 12px;
}

.legal-block p {
  font-size: 15px;
  color: #6b6b8a;
  line-height: 1.75;
  margin: 0;
}
</style>
