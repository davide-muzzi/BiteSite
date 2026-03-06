<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Plus, ArrowRight } from "lucide-vue-next";

const templates = [
    { id: 1, title: "Template 1" },
    { id: 2, title: "Template 2" },
    { id: 3, title: "Template 3" },
    { id: 4, title: "Template catalogue" }
];

const projects = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: index === 0 ? "Create new" : `Project V${index}`,
    isCreateCard: index === 0
}));

const scrollContainer = ref(null);
const scrollProgress = ref(0);

function handleTemplateClick(template) {
    console.log("Template clicked:", template.title);
}

function handleProjectClick(project) {
    if (project.isCreateCard) {
        console.log("Create new project clicked");
        return;
    }

    console.log("Project clicked:", project.title);
}

function updateScrollProgress() {
    if (!scrollContainer.value) return;

    const el = scrollContainer.value;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (maxScroll <= 0) {
        scrollProgress.value = 0;
        return;
    }

    scrollProgress.value = (el.scrollLeft / maxScroll) * 100;
}

function scrollProjects(direction) {
    if (!scrollContainer.value) return;

    const amount = 320;
    scrollContainer.value.scrollBy({
        left: direction === "right" ? amount : -amount,
        behavior: "smooth"
    });
}

const progressStyle = computed(() => ({
    width: `${Math.max(scrollProgress.value * 0.22 + 6, 6)}%`,
    transform: `translateX(${scrollProgress.value * 0.78}%)`
}));

onMounted(() => {
    updateScrollProgress();
    window.addEventListener("resize", updateScrollProgress);
});

onUnmounted(() => {
    window.removeEventListener("resize", updateScrollProgress);
});
</script>

<template>
    <div class="projects-overview-page">
        <section class="templates-section">
            <div class="content-width">
                <h2 class="section-title">Explore Templates</h2>

                <div class="templates-grid">
                    <button v-for="template in templates" :key="template.id" class="template-card" type="button"
                        @click="handleTemplateClick(template)">
                        <div class="template-preview">
                            <div v-if="template.title !== 'Template catalogue'" class="template-image-placeholder">
                                <span>{{ template.title }}</span>
                            </div>

                            <div v-else class="catalogue-placeholder">
                                <div class="catalogue-layer layer-1"></div>
                                <div class="catalogue-layer layer-2"></div>
                                <div class="catalogue-layer layer-3"></div>
                            </div>
                        </div>

                        <div v-if="template.title === 'Template catalogue'" class="catalogue-label">
                            <span>Template catalogue</span>
                            <ArrowRight class="catalogue-arrow" />
                        </div>
                    </button>
                </div>
            </div>
        </section>

        <section class="projects-section">
            <div class="content-width">
                <h2 class="section-title">My projects</h2>

                <div ref="scrollContainer" class="projects-slider" @scroll="updateScrollProgress">
                    <button v-for="project in projects" :key="project.id" class="project-card"
                        :class="{ 'create-card': project.isCreateCard }" type="button"
                        @click="handleProjectClick(project)">
                        <template v-if="project.isCreateCard">
                            <div class="create-icon-wrapper">
                                <Plus class="create-icon" />
                            </div>
                            <div class="project-title create-title">Create new</div>
                        </template>

                        <template v-else>
                            <div class="project-date">11.9.2025 | 11:00</div>
                            <div class="project-preview">
                                <span>{{ project.title }}</span>
                            </div>
                            <div class="project-title">{{ project.title }}</div>
                        </template>
                    </button>
                </div>

                <div class="slider-progress-track">
                    <div class="slider-progress-fill" :style="progressStyle"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.projects-overview-page {
    min-height: 100vh;
    background-color: var(--background);
    color: var(--font-color-dark-blue);
    font-family: var(--font);
}

.content-width {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-left: 68px;
    padding-right: 68px;
    box-sizing: border-box;
}

.templates-section {
    background-color: #f4e7d8;
    border-bottom-left-radius: 42px;
    border-bottom-right-radius: 42px;
    padding-top: 48px;
    padding-bottom: 54px;
}

.projects-section {
    padding-top: 34px;
    padding-bottom: 48px;
}

.section-title {
    margin: 0 0 28px 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
}

.templates-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
}

.template-card {
    border: 1.5px solid rgba(49, 38, 110, 0.4);
    border-radius: 22px;
    background: #f8f8f8;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    min-height: 170px;
}

.template-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
    border-color: var(--font-color-dark-blue);
}

.template-preview {
    height: 100%;
    min-height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #efefef;
}

.template-image-placeholder {
    width: 100%;
    height: 100%;
    min-height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
        linear-gradient(135deg,
            #dbdbdb 0%,
            #efefef 50%,
            #d9d9d9 100%);
    color: #7d7d7d;
    font-size: 0.95rem;
    font-weight: 600;
}

.catalogue-placeholder {
    position: relative;
    width: 180px;
    height: 95px;
}

.catalogue-layer {
    position: absolute;
    border-radius: 4px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.layer-1 {
    width: 86px;
    height: 56px;
    background: #fd043c;
    top: 0;
    left: 18px;
}

.layer-2 {
    width: 86px;
    height: 56px;
    background: #41308f;
    top: 20px;
    left: 48px;
}

.layer-3 {
    width: 86px;
    height: 56px;
    background: #1e1e1e;
    top: 38px;
    left: 78px;
}

.catalogue-label {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 6px;
    color: #111;
    font-size: 0.95rem;
    font-weight: 500;
    white-space: nowrap;
}

.template-card:last-child {
    position: relative;
}

.catalogue-arrow {
    width: 16px;
    height: 16px;
}

.projects-slider {
    display: flex;
    gap: 28px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    padding-bottom: 10px;
    scrollbar-width: none;
}

.projects-slider::-webkit-scrollbar {
    display: none;
}

.project-card {
    flex: 0 0 270px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    text-align: left;
    transition: transform 0.18s ease;
}

.project-card:hover {
    transform: translateY(-3px);
}

.project-date {
    font-size: 0.72rem;
    color: rgba(49, 38, 110, 0.55);
    margin-bottom: 6px;
    padding-left: 8px;
}

.project-preview {
    width: 100%;
    height: 165px;
    border-radius: 18px;
    background:
        linear-gradient(135deg,
            #d8d8d8 0%,
            #ececec 50%,
            #d4d4d4 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7d7d7d;
    font-weight: 600;
    font-size: 0.95rem;
}

.project-title {
    margin-top: 12px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #111;
}

.create-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.create-card .project-title {
    color: #111;
}

.create-icon-wrapper {
    width: 100%;
    height: 165px;
    border-radius: 18px;
    background: #f6f6f6;
    display: flex;
    align-items: center;
    justify-content: center;
}

.create-icon {
    width: 48px;
    height: 48px;
    color: #111;
    stroke-width: 3;
}

.create-title {
    margin-top: 14px;
}

.slider-progress-track {
    width: 100%;
    height: 10px;
    background: #f2dfcf;
    border-radius: 999px;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
}

.slider-progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 999px;
    background: var(--accent);
    transition: transform 0.15s linear, width 0.15s linear;
}
</style>