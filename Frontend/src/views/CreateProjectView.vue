<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from '@/components/BackButton.vue';
import { createProject } from '../api/routes/project.js';
import router from "@/router";

const currentRoute = useRoute();

const name = ref("");
const title = ref("");
const route = ref("");
const errorMessage = ref("");

const newTag = ref("");

const tags = ref([]);

const validTemplates = ["blank", "simple", "warm", "dark"];
const templateName = ref(validTemplates.includes(currentRoute.query.template) ? currentRoute.query.template : "blank");

const templates = [
  { id: "blank",  label: "Blank",  desc: "Start from scratch",           accent: "#dddddd", dark: false },
  { id: "simple", label: "Simple", desc: "Clean & minimal",              accent: "#1a1a1a", dark: true  },
  { id: "warm",   label: "Warm",   desc: "Cozy, earthy tones",           accent: "#6b3a2a", dark: true  },
  { id: "dark",   label: "Dark",   desc: "Moody with a gold accent",     accent: "#111111", dark: true  },
];

function addTag() {
    const newTagName = `#${newTag.value}`;
    if (tags.value.some(tag => tag.tagName.toLowerCase() === newTagName.toLowerCase())) return;

    tags.value.push({ tagName: newTagName });
    newTag.value = "";
}

function deleteTag(deleteTagName) {
    tags.value = tags.value.filter(tag => tag.tagName !== deleteTagName)
}

const handleCreateProject = async () => {
  console.log(name.value);
  const result = await createProject(
    name.value,
    title.value,
    route.value,
    tags.value.map(tag => tag.tagName),
    templateName.value
  );

  if (result.success)
    router.push(`/dashboard/${result.projectId}`);
  else
    errorMessage.value = result.message;
}

</script>

<template>
    <section class="create-project-view">
        <BackButton class="create-project-back" />

        <div class="page-header">
            <h1>Create Project</h1>
            <p>Define your concept and tags to kick off a new project with the right focus.</p>
        </div>

        <div class="form-card">
            <div class="field-group">
                <label>Name</label>
                <input v-model="name" type="text" placeholder="Enter project name ..." />
            </div>
            <div class="field-group">
                <label>Website Title</label>
                <input v-model="title" type="text" placeholder="Enter website title ..." />
            </div>
            <div class="field-group">
                <label>Website URL Route (must be unique)</label>
                <input v-model="route" type="text" placeholder="Enter website route ..." />
            </div>

            <div class="field-group">
                <label>Tags</label>

                <div class="tag-list" v-if="tags.length">
                    <span class="tag-pill" v-for="tag in tags" :key="tag.tagName">
                        {{ tag.tagName }}
                        <button class="tag-remove" @click="deleteTag(tag.tagName)">×</button>
                    </span>
                </div>

                <div class="tag-input-row">
                    <input class="tag-input" v-model="newTag" type="text" placeholder="Pizza"
                        @keydown.enter.prevent="addTag()" />
                    <button class="add-tag-btn" type="button" @click="addTag">
                        +
                    </button>
                </div>
            </div>

            <div class="field-group">
                <label>Template</label>
                <div class="template-picker">
                    <button
                        v-for="tpl in templates"
                        :key="tpl.id"
                        type="button"
                        class="template-card"
                        :class="{ selected: templateName === tpl.id }"
                        @click="templateName = tpl.id"
                    >
                        <div class="template-swatch" :style="{ backgroundColor: tpl.accent }">
                            <div v-if="tpl.id === 'warm'" class="swatch-bar" style="background:#f5deb3"></div>
                            <div v-else-if="tpl.id === 'dark'" class="swatch-bar" style="background:#d4a843"></div>
                            <div v-else-if="tpl.id === 'simple'" class="swatch-bar" style="background:#ffffff"></div>
                            <div v-else class="swatch-bar" style="background:#222222"></div>
                        </div>
                        <div class="template-info">
                            <span class="template-name">{{ tpl.label }}</span>
                            <span class="template-desc">{{ tpl.desc }}</span>
                        </div>
                    </button>
                </div>
            </div>

            <button class="create-btn" type="button" @click="handleCreateProject()">
                Create
            </button>
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        </div>
    </section>
</template>

<style scoped>
.create-project-view {
    min-height: calc(100vh - 160px);
    padding: 42px 78px 80px;
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    box-sizing: border-box;
}

.page-header {
    max-width: 640px;
    margin: 0 auto 28px;
    text-align: center;
}

.create-project-back {
    display: inline-flex;
    margin-bottom: 22px;
}

.page-header h1 {
    margin: 0 0 6px;
    font-size: 48px;
    font-weight: 800;
}

.page-header p {
    margin: 0;
    font-size: 18px;
    color: rgba(32, 32, 32, 0.65);
    font-weight: 600;
}

.form-card {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    background: white;
    border-radius: 28px;
    padding: 40px 48px 48px;
    box-shadow: 0 28px 60px rgba(49, 38, 110, 0.12);
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.field-group label {
    font-size: 18px;
    font-weight: 700;
}

.field-group input {
    width: 100%;
    height: 64px;
    border-radius: 999px;
    border: none;
    padding: 0 28px;
    background: #f9f6f1;
    font-family: var(--font);
    font-size: 18px;
    font-weight: 600;
    color: #2b2b2b;
    box-sizing: border-box;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 999px;
    background: var(--font-color-dark-blue);
    color: white;
    font-size: 14px;
    font-weight: 700;
}

.tag-remove {
    border: none;
    background: transparent;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
}

.tag-input-row {
    display: flex;
    gap: 12px;
    align-items: center;
}

.tag-input {
    flex: 1;
}

.add-tag-btn {
    width: 64px;
    height: 64px;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: white;
    font-size: 28px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.add-tag-btn:hover {
    background: var(--button-hover-color);
    transform: translateY(-1px);
}

.create-btn {
    height: 66px;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: white;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.create-btn:hover {
    background: var(--button-hover-color);
    transform: translateY(-2px);
}

.error-message {
  color: red;
  text-align: center;
  font-size: 18px;
}

.template-picker {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.template-card {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    border: 2px solid transparent;
    overflow: hidden;
    cursor: pointer;
    background: #f9f6f1;
    transition: border-color 0.15s ease, transform 0.15s ease;
    padding: 0;
    text-align: left;
}

.template-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
}

.template-card.selected {
    border-color: var(--accent);
}

.template-swatch {
    height: 72px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    padding-left: 10px;
}

.swatch-bar {
    height: 8px;
    width: 60%;
    border-radius: 4px;
    opacity: 0.7;
}

.template-info {
    padding: 10px 14px 12px;
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.template-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--font-color-dark-blue);
}

.template-desc {
    font-size: 12px;
    font-weight: 500;
    color: rgba(32, 32, 32, 0.55);
}
</style>
