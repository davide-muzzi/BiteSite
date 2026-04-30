<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Save, ChevronRight, Plus } from "lucide-vue-next";
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
const selectedPage = ref("");
const pageDropdownOpen = ref(false);
const addPageInput = ref("");
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

const togglePageDropdown = (_, page) => {
  pageDropdownOpen.value = !pageDropdownOpen.value;
  addPageInput.value = "";

  if (!page) return;

  selectedPage.value = page;
}

const handleAddPage = (page) => {
  website.value.pages.push({
    name: page,
    backgroundColor: "white",
    components: [],
  });

  addPageInput.value = "";
  loadPreview();
}

onMounted(async () => {
  const result = await getWebsite(projectId.value);

  if (result.success) {
    website.value = result.website;

    selectedPage.value = website.value.pages[0].name;
    loadPreview();
    doneLoading.value = true;
  }

});
</script>

<template>
    <div class="editor-page">
        <div class="sidebar-wrapper" v-if="doneLoading">
            <div class="edits">
                <h2>Components</h2>
                <EditorSidebar
                  :website="website"
                  :page="selectedPage"
                  @selectElement="handleSelectElement"
                />
            </div>
            <div></div>
        </div>
        <div class="editor-main">
            <div class="editor-topbar">
                <div
                  class="page-dropdown"
                >
                  <div
                    class="page-dropdown-head"
                    @click="togglePageDropdown"
                  >
                    <ChevronRight :class="{ 'open': pageDropdownOpen }"/>
                    <div>{{ selectedPage}}</div>
                  </div>
                  <div
                    class="page-dropdown-body"
                    v-if="pageDropdownOpen"
                  >
                    <div
                      v-for="page of website.pages"
                      @click="togglePageDropdown(_, page.name)"
                    >
                      {{ page.name }}
                    </div>
                    <div class="add-page">
                      <input
                        type="text"
                        v-model="addPageInput"
                        @keydown.enter="handleAddPage(addPageInput)"
                      />
                      <button @click="handleAddPage(addPageInput)">
                        <Plus/>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  class="save-button"
                  :disabled="isSaved"
                  @click="handleUpdateWebsite"
                >
                  <Save/>
                  <div>Save</div>
                </button>
            </div>
            <iframe ref="iframeRef" frameborder="0"></iframe>
        </div>
    </div>
</template>

<style scoped>
body {
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
}

h2 {
  margin-top: 0;
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

.page-dropdown {
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  position: relative;
  height: 22.5px;
  width: 50%;
}

.page-dropdown * {
  transition: 0.05s;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-dropdown > * {
  position: absolute;
}

.page-dropdown-head {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
}

.page-dropdown-head .open {
  transform: rotate(90deg);
}

.page-dropdown-body {
  top: 30px;
  background-color: var(--background);
  min-width: 200px;
  max-width: 100%;
  padding: 10px;
  border-bottom-right-radius: 25px;
}

.page-dropdown-body > div:not(:last-child) {
  border-radius: 10px;
  padding: 10px;
}

.page-dropdown-body > div:hover:not(:last-child) {
  background-color: color-mix(in srgb, var(--font-color-dark-blue) 20%, transparent);
}

.add-page {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 45px;
  padding-top: 10px;
}

.add-page button {
  background-color: var(--font-color-dark-blue);
  border-radius: 10px;
  height: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-page button:hover {
  filter: brightness(0.8);
}

.add-page input {
  height: 100%;
  box-sizing: border-box;
  background-color: var(--background);
  outline: none;
  border: none;
  border-bottom: 2px solid var(--font-color-dark-blue);
  color: var(--font-color-dark-blue);
  font-size: 16px;
  font-weight: 500;
}

.add-page button .lucide {
  color: white;
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
