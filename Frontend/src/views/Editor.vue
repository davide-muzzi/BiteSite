<script setup>
import { ref, reactive, onMounted, watch, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { Save, ChevronRight, Plus, Trash2 } from "lucide-vue-next";
import { getWebsite, updateWebsite } from "@/api/routes/project.js";
import EditorSidebar from "@/components/editor/EditorSidebar.vue";
import parseWebsite from "@/website-parser/parseWebsite.js";

const route = useRoute();

const projectId = ref(route.params.projectId);
const website = ref({});
const isSaved = ref(true);
const doneLoading = ref(false);
const iframeRef = ref(null);
const selectedElement = ref("");
const selectedPage = ref(0);
const pageDropdownOpen = ref(false);
const addPageInput = ref("");
const pageSettingsOpen = ref(false);
const pageDropdownRef = ref(null);
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
  const html = parseWebsite(website.value, selectedElement.value, selectedPage.value, projectId.value);
  const doc = iframeRef.value.contentDocument;

  doc.open();
  doc.write(html);
  doc.close();

  doc.addEventListener("click", () => {
    if (pageDropdownOpen.value) togglePageDropdown();
  });
}

const handleSelectElement = (id) => {
  selectedElement.value = id;
  loadPreview();
}

const togglePageDropdown = (_, page) => {
  pageDropdownOpen.value = !pageDropdownOpen.value;
  addPageInput.value = "";

  if (!page && page !== 0) return;

  selectedPage.value = page;
  loadPreview();
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

const handleDeletePage = () => {
  const deletingPage = selectedPage.value;
  selectedPage.value = 0;
  website.value.pages.splice(deletingPage, 1);
}

const handleClickOutsidePageDropdown = (event) => {
  if (!pageDropdownOpen.value) return;

  if (!pageDropdownRef.value?.contains(event.target)) {
    togglePageDropdown();
  }
}

onMounted(async () => {
  const result = await getWebsite(projectId.value);

  if (result.success) {
    website.value = result.website;

    loadPreview();
    doneLoading.value = true;
  }

  window.addEventListener("click", handleClickOutsidePageDropdown);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutsidePageDropdown);
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
            <div
              class="page-settings"
              :class="{ 'open': pageSettingsOpen }"
            >
              <div @click="pageSettingsOpen = !pageSettingsOpen">
                <ChevronRight/>
                <div>Page Settings</div>
              </div>
              <div
                class="page-settings-body"
                v-if="pageSettingsOpen"
              >
                <div class="page-name-input">
                  <div>Name:</div>
                  <input type="text" v-model="website.pages[selectedPage].name"/>
                </div>
                <div class="page-color-input">
                  <div>Background color:</div>
                  <div>
                    <input type="color" v-model="website.pages[selectedPage].backgroundColor"/>
                    <input type="text" v-model="website.pages[selectedPage].backgroundColor"/>
                  </div>
                </div>
                <button
                  class="delete-page-button"
                  v-if="selectedPage !== 0"
                  @click="handleDeletePage"
                >
                  <Trash2/>
                  <div>Delete</div>
                </button>
              </div>
            </div>
        </div>
        <div class="editor-main">
            <div class="editor-topbar">
                <div
                  class="page-dropdown"
                  ref="pageDropdownRef"
                >
                  <div
                    class="page-dropdown-head"
                    @click="togglePageDropdown"
                  >
                    <ChevronRight :class="{ 'open': pageDropdownOpen }"/>
                    <div>{{ website.pages?.[selectedPage].name }}</div>
                  </div>
                  <div
                    class="page-dropdown-body"
                    v-if="pageDropdownOpen"
                  >
                    <div
                      v-for="(page, index) of website.pages"
                      @click="togglePageDropdown(_, index)"
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
    border-bottom-right-radius: 25px;
    padding: 25px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 25px;
}

.page-settings {
  display: flex;
  flex-direction: column;
  width: 100%;
  display: grid;
}

.page-settings * {
  transition: 0.05s;
}

.page-settings > div:first-child {
  display: flex;
  align-items: center;
  background-color: var(--accent);
  color: white;
  padding: 10px;
  border-radius: 25px;
  user-select: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  grid-area: 1/1;
  height: 45px;
  box-sizing: border-box;
}

.page-settings-body {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.page-settings-body > div > div:first-child {
  font-weight: 600;
}

.page-settings input {
  border: none;
  color: var(--font-color-dark-blue);
  font-weight: 500;
  outline: none;
}

.page-settings.open > div:first-child .lucide {
  transform: rotate(90deg);
}

.page-name-input {
  display: flex;
  gap: 5px;
  flex-direction: column;
}

.page-color-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
}

.page-color-input div:last-child {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 5px;
}

.page-settings input[type="text"] {
  background-color: var(--card-color);
  border-bottom: 2px solid var(--font-color-dark-blue);
  flex: 1;
}

.delete-page-button {
  background-color: var(--card-color);
  display: flex;
  color: var(--font-color-dark-blue);
  border: 3px solid var(--font-color-dark-blue);
  justify-content: center;
  font-size: 18px;
  gap: 10px;
  font-weight: 550;
  height: 40px;
  align-items: center;
  border-radius: 25px;
}

.delete-page-button .lucide {
  width: 20px;
  aspect-ratio: 1/1;
}

.delete-page-button:hover {
  background-color: var(--font-color-dark-blue);
  color: white;
}

.editor-page {
    display: flex;
    height: 100%;
    gap: 10px;
    min-height: 100vh;
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
