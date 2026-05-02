<script setup>
import BackButton from '@/components/BackButton.vue';
import router from '@/router';

const templates = [
    { id: "blank",  name: "Blank",  desc: "Start from scratch. One empty page, ready to build.",  navColor: "#222222", pageBg: "#ffffff" },
    { id: "simple", name: "Simple", desc: "Clean, minimal layout with a welcome section and review CTA.", navColor: "#1a1a1a", pageBg: "#ffffff" },
    { id: "warm",   name: "Warm",   desc: "Earthy tones with a reservation form and review section.", navColor: "#6b3a2a", pageBg: "#fdf6ec" },
    { id: "dark",   name: "Dark",   desc: "Moody dark theme with gold accents and a booking form.",  navColor: "#111111", pageBg: "#1a1a1a" },
];

function handleTemplateClick(template) {
    router.push({ path: "/create-project", query: { template: template.id } });
}
</script>

<template>
    <main class="template-view">
        <section class="template-section">
            <BackButton class="template-back" />

            <div class="section-header">
                <h1>Explore Templates</h1>
            </div>

            <div class="template-grid">
                <article v-for="template in templates" :key="template.id" class="template-card"
                    @click="handleTemplateClick(template)">
                    <div class="template-thumbnail" :style="{ backgroundColor: template.pageBg }">
                        <div class="thumb-nav" :style="{ backgroundColor: template.navColor }"></div>
                        <div class="thumb-body">
                            <div class="thumb-block" :style="{ backgroundColor: template.navColor }"></div>
                            <div class="thumb-block thumb-block-sm" :style="{ backgroundColor: template.navColor }"></div>
                            <div class="thumb-block thumb-block-xs" :style="{ backgroundColor: template.navColor }"></div>
                        </div>
                        <div class="thumbnail-overlay">
                            <h2>{{ template.name }}</h2>
                        </div>
                    </div>
                    <p class="template-desc">{{ template.desc }}</p>
                </article>
            </div>
        </section>
    </main>
</template>

<style scoped>
.template-view {
    min-height: calc(100vh - 160px);
    padding: 42px 78px 56px;
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    box-sizing: border-box;
}

.template-section {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
}

.template-back {
    margin-bottom: 24px;
}

.section-header {
    margin-bottom: 32px;
}

.section-header h1 {
    margin: 0;
    font-size: 48px;
    line-height: 1.05;
    font-weight: 800;
    color: var(--font-color-dark-blue);
}

.template-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px 22px;
}

.template-card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    cursor: pointer;
}

.template-thumbnail {
    position: relative;
    width: 100%;
    height: 220px;
    border-radius: 22px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.template-card:hover .template-thumbnail {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(49, 38, 110, 0.12);
}

.thumb-nav {
    height: 18px;
    width: 100%;
    flex-shrink: 0;
}

.thumb-body {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}

.thumb-block {
    height: 28px;
    width: 100%;
    border-radius: 5px;
    opacity: 0.13;
}

.thumb-block-sm {
    width: 65%;
    height: 18px;
    opacity: 0.08;
}

.thumb-block-xs {
    width: 40%;
    height: 14px;
    opacity: 0.06;
}

.thumbnail-overlay {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 14px;
}

.thumbnail-overlay h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.template-desc {
    margin: 10px 4px 0;
    font-size: 13px;
    font-weight: 500;
    color: rgba(32, 32, 32, 0.55);
    line-height: 1.4;
}
</style>

