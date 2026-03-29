<script setup>
const templates = [
    { id: 1, name: "Template 01", category: "Restaurant Template" },
    { id: 2, name: "Template 02", category: "Restaurant Template" },
    { id: 3, name: "Template 03", category: "Restaurant Template" },
    { id: 4, name: "Template 04", category: "Restaurant Template" },
    { id: 5, name: "Template 05", category: "Restaurant Template" },
    { id: 6, name: "Template 06", category: "Restaurant Template" },
    { id: 7, name: "Template 07", category: "Restaurant Template" },
    { id: 8, name: "Template 08", category: "Restaurant Template" },
    { id: 9, name: "Template 09", category: "Restaurant Template" },
    { id: 10, name: "Template 10", category: "Restaurant Template" },
    { id: 11, name: "Template 11", category: "Restaurant Template" },
    { id: 12, name: "Template 12", category: "Restaurant Template" },
]

function handleTemplateClick(template) {
    console.log("Template clicked:", template)
}

function handleUseClick(template) {
    console.log("Use template clicked:", template)
}
</script>

<template>
    <main class="template-view">
        <section class="template-section">
            <div class="section-header">
                <h1>Explore Templates</h1>
            </div>

            <div class="template-grid">
                <article v-for="template in templates" :key="template.id" class="template-card"
                    @click="handleTemplateClick(template)">
                    <div class="template-thumbnail">

                        <div class="template-placeholder">
                            Template
                        </div>

                        <span class="category">
                            {{ template.category }}
                        </span>

                        <div class="thumbnail-overlay">
                            <h2>{{ template.name }}</h2>
                        </div>

                    </div>

                    <div class="template-card-footer">
                        <button class="primary-btn" @click.stop="handleUseClick(template)">
                            Use Template
                        </button>
                    </div>
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
    background: #d9d9d9;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.template-card:hover .template-thumbnail {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(49, 38, 110, 0.12);
}

.template-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.2);
    background: #d3d3d3;
    user-select: none;
}

.thumbnail-overlay {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 14px;
}

.category {
    position: absolute;
    top: 14px;
    left: 14px;

    padding: 5px 10px;
    border-radius: 999px;

    background: rgba(255, 245, 236, 0.95);
    color: var(--font-color-dark-blue);

    font-size: 11px;
    font-weight: 700;
}

.thumbnail-overlay h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.28);
}

.template-card-footer {
    display: flex;
}

.template-card-footer button {
    height: 42px;
    border-radius: 999px;
    font-family: var(--font);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.18s ease;
}

.primary-btn {
    flex: 1;
    border: none;
    background: var(--accent);
    color: white;
}

.primary-btn:hover {
    background: var(--button-hover-color);
}

</style>