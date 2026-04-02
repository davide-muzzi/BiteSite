<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import router from "@/router";
import {
    Plus,
    ArrowRight,
    ChevronLeft,
    ChevronRight
} from "lucide-vue-next";

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
const trackRef = ref(null);

const scrollLeft = ref(0);
const maxScroll = ref(0);
const clientWidth = ref(0);
const scrollWidth = ref(0);

const isDraggingProjects = ref(false);
const dragStartX = ref(0);
const dragStartScrollLeft = ref(0);

const isDraggingThumb = ref(false);
const thumbDragStartX = ref(0);
const thumbDragStartScrollLeft = ref(0);

function handleTemplateClick(template) {
    if (template.title === "Template catalogue") {
        router.push({ name: "templates" });
        return;
    }

    console.log("Template clicked:", template.title);
}

function handleProjectClick(project) {
    if (project.isCreateCard) {
      window.location.href = "/create-project"
      return;
    }

    console.log("Project clicked:", project.title);
}

function updateScrollMetrics() {
    if (!scrollContainer.value) return;

    const el = scrollContainer.value;
    scrollLeft.value = el.scrollLeft;
    clientWidth.value = el.clientWidth;
    scrollWidth.value = el.scrollWidth;
    maxScroll.value = Math.max(el.scrollWidth - el.clientWidth, 0);
}

function scrollProjects(direction) {
    if (!scrollContainer.value) return;

    const amount = 420;

    scrollContainer.value.scrollBy({
        left: direction === "right" ? amount : -amount,
        behavior: "smooth"
    });
}

const thumbWidthPercent = computed(() => {
    if (!scrollWidth.value || !clientWidth.value) return 0;

    const percent = (clientWidth.value / scrollWidth.value) * 100;
    return Math.max(percent, 8);
});

const thumbLeftPercent = computed(() => {
    if (maxScroll.value <= 0) return 0;

    const movableArea = 100 - thumbWidthPercent.value;
    return (scrollLeft.value / maxScroll.value) * movableArea;
});

const progressStyle = computed(() => ({
    width: `${thumbWidthPercent.value}%`,
    left: `${thumbLeftPercent.value}%`
}));

function onProjectsMouseDown(event) {
    if (!scrollContainer.value) return;

    isDraggingProjects.value = true;
    dragStartX.value = event.pageX;
    dragStartScrollLeft.value = scrollContainer.value.scrollLeft;
}

function onGlobalMouseMove(event) {
    if (isDraggingProjects.value && scrollContainer.value) {
        const delta = event.pageX - dragStartX.value;
        scrollContainer.value.scrollLeft = dragStartScrollLeft.value - delta;
    }

    if (isDraggingThumb.value && scrollContainer.value && trackRef.value) {
        const trackRect = trackRef.value.getBoundingClientRect();
        const deltaX = event.clientX - thumbDragStartX.value;
        const trackWidth = trackRect.width;

        if (trackWidth <= 0 || maxScroll.value <= 0) return;

        const movableTrackWidth =
            trackWidth * (1 - thumbWidthPercent.value / 100);

        if (movableTrackWidth <= 0) return;

        const scrollDelta =
            (deltaX / movableTrackWidth) * maxScroll.value;

        scrollContainer.value.scrollLeft =
            thumbDragStartScrollLeft.value + scrollDelta;
    }
}

function stopDragging() {
    isDraggingProjects.value = false;
    isDraggingThumb.value = false;
}

function onThumbMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();

    if (!scrollContainer.value) return;

    isDraggingThumb.value = true;
    thumbDragStartX.value = event.clientX;
    thumbDragStartScrollLeft.value = scrollContainer.value.scrollLeft;
}

function onTrackClick(event) {
    if (!scrollContainer.value || !trackRef.value) return;
    if (event.target !== trackRef.value) return;

    const trackRect = trackRef.value.getBoundingClientRect();
    const clickX = event.clientX - trackRect.left;
    const trackWidth = trackRect.width;

    if (trackWidth <= 0 || maxScroll.value <= 0) return;

    const thumbWidthPx = trackWidth * (thumbWidthPercent.value / 100);
    const targetThumbLeft = clickX - thumbWidthPx / 2;
    const maxThumbLeft = trackWidth - thumbWidthPx;
    const clampedThumbLeft = Math.max(0, Math.min(targetThumbLeft, maxThumbLeft));

    const targetScrollLeft =
        maxThumbLeft > 0
            ? (clampedThumbLeft / maxThumbLeft) * maxScroll.value
            : 0;

    scrollContainer.value.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
    });
}

onMounted(() => {
    updateScrollMetrics();

    if (scrollContainer.value) {
        scrollContainer.value.addEventListener("scroll", updateScrollMetrics);
    }

    window.addEventListener("resize", updateScrollMetrics);
    window.addEventListener("mousemove", onGlobalMouseMove);
    window.addEventListener("mouseup", stopDragging);
});

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener("scroll", updateScrollMetrics);
    }

    window.removeEventListener("resize", updateScrollMetrics);
    window.removeEventListener("mousemove", onGlobalMouseMove);
    window.removeEventListener("mouseup", stopDragging);
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
                <div class="projects-header">
                    <h2 class="section-title">My projects</h2>

                    <div class="slider-buttons">
                        <button class="slider-arrow" type="button" @click="scrollProjects('left')">
                            <ChevronLeft />
                        </button>

                        <button class="slider-arrow" type="button" @click="scrollProjects('right')">
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                <div ref="scrollContainer" class="projects-slider" @mousedown="onProjectsMouseDown">
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

                <div ref="trackRef" class="slider-progress-track" @click="onTrackClick">
                    <div class="slider-progress-fill" :style="progressStyle" @mousedown="onThumbMouseDown"></div>
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
    margin-top: -80px;
    padding-top: 128px;
    padding-bottom: 54px;
    position: relative;
    z-index: 0;
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
    background: linear-gradient(135deg,
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
    font-weight: 600;
    white-space: nowrap;
}

.template-card:last-child {
    position: relative;
}

.catalogue-arrow {
    width: 16px;
    height: 16px;
}

.projects-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
}

.projects-header .section-title {
    margin: 0;
}

.slider-buttons {
    display: flex;
    gap: 12px;
}

.slider-arrow {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 2px solid var(--font-color-dark-blue);
    background: transparent;
    color: var(--font-color-dark-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.18s ease;
}

.slider-arrow:hover {
    background: rgba(49, 38, 110, 0.08);
    transform: translateY(-1px);
}

.slider-arrow svg {
    width: 20px;
    height: 20px;
}

.projects-slider {
    display: flex;
    gap: 28px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    padding-bottom: 10px;
    scrollbar-width: none;
    cursor: grab;
    user-select: none;
}

.projects-slider:active {
    cursor: grabbing;
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
    background: linear-gradient(135deg,
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
    height: 14px;
    background: #f2dfcf;
    border-radius: 999px;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.slider-progress-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 999px;
    background: var(--accent);
    cursor: grab;
    transition: left 0.05s linear;
}

.slider-progress-fill:active {
    cursor: grabbing;
}
</style>
