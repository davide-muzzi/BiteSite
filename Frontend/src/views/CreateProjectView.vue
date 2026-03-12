<script setup>
import { ref } from 'vue';

const projectName = ref("");

const newTag = ref("");

const tags = ref([
    { tagName: "#Italian" },
    { tagName: "#Pasta" },
    { tagName: "#Pizza" },
])

function addTag() {
    const newTagName = `#${newTag.value}`;
    if (tags.value.some(tag => tag.tagName.toLowerCase() === newTagName.toLowerCase())) return;

    tags.value.push({ tagName: newTagName });
    newTag.value = "";
}

function deleteTag(deleteTagName) {
    tags.value = tags.value.filter(tag => tag.tagName !== deleteTagName)
}

function create() {
    console.log(projectName.value);
    for (let tag of tags.value) {
        console.log(tag)
    }
}
</script>

<template>
    <section class="create-project-view">
        <div class="page-header">
            <h1>Create Project</h1>
            <p>Define your concept and tags to kick off a new project with the right focus.</p>
        </div>

        <div class="form-card">
            <div class="field-group">
                <label>Name</label>
                <input v-model="projectName" type="text" placeholder="Enter project name ..." />
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

            <button class="create-btn" type="button" @click="create">
                Create
            </button>
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
</style>
