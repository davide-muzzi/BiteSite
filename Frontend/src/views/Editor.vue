<script setup>
import EditorSidebar from "@/components/editor-sidebar/EditorSidebar.vue";
</script>

<template>
    <div class="editor-page">
        <div class="side-bar">
            <h2>Components</h2>
            <div class="edits">
                <EditorSidebar/>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
}

.editor-page {
    display: flex;
}

.side-bar {
    width: 302px;
    background-color: var(--card-color);
    border-top-right-radius: 22px;
    padding: 25px;
    
}

</style>