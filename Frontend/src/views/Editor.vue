<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Save } from "lucide-vue-next";
import { getWebsite, updateWebsite } from "@/api/routes/project.js";
import EditorSidebar from "@/components/editor-sidebar/EditorSidebar.vue";
import parseWebsite from "@/website-parser/parseWebsite.js";

const route = useRoute();

const projectId = ref(route.params.projectId);
const website = ref({});
const isSaved = ref(true);
const doneLoading = ref(false);
const iframeRef = ref(null);
const selectedElement = ref("");
let ignoreWatch = true;

const handleUpdateWebsite = async () => {
  const result = await updateWebsite(projectId.value, website.value);

  if (result.success)
    isSaved.value = true;
}

watch(() => website.value, () => {
  if (ignoreWatch)
    return ignoreWatch = false;

  loadPreview();
  isSaved.value = false;
}, { deep: true });

const loadPreview = () => {
  const html = parseWebsite(website.value, selectedElement.value);
  const doc = iframeRef.value.contentDocument;

  doc.open();
  doc.write(html);
  doc.close();
}

const handleSelectElement = (id) => {
  selectedElement.value = id;
  loadPreview();
}

onMounted(async () => {
  const result = await getWebsite(projectId.value);

  if (result.success)
    website.value = result.website;

  loadPreview();
  doneLoading.value = true;
});
</script>

<template>
    <div class="editor-page">
        <div class="sidebar-wrapper" v-if="doneLoading">
            <h2>Components</h2>
            <div class="edits">
                <EditorSidebar
                  :website="website"
                  page="Home"
                  @selectElement="handleSelectElement"
                />
            </div>
        </div>
        <div class="editor-main">
            <div class="editor-topbar">
                <button></button>
                <button
                  class="save-button"
                  :disabled="isSaved"
                  @click="handleUpdateWebsite"
                >
                  <Save/>
                  <div>Save</div>
                </button>
            </div>
            <iframe ref="iframeRef" src="https://wikipedia.com" frameborder="0"></iframe>
        </div>
    </div>
</template>

<style scoped>
body {
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
}

.sidebar-wrapper {
    min-width: 350px;
    box-sizing: border-box;
    background-color: var(--card-color);
    border-top-right-radius: 25px;
    padding: 25px;
    height: 100%;
}

.editor-page {
    display: flex;
    margin-top: 80px;
    height: 100%;
    gap: 10px;
}

.editor-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 10px;
  gap: 10px;
}

.editor-topbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.save-button {
  background-color: var(--accent);
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 25px;
  color: white;
  padding: 0 15px;
  font-size: 18px;
  font-weight: 550;
  height: 45px;
}

.save-button:disabled {
  cursor: default;
  opacity: 0.6;
  }

.save-button:hover:not(:disabled) {
  filter: brightness(0.9);
}

.save-button .lucide {
  color: white;
}

iframe {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  overflow-y: auto;
}
</style>
