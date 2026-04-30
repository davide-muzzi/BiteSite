<script setup>
import { ref } from "vue";
import EditorSidebar from "@/components/editor-sidebar/EditorSidebar.vue";

const project = ref({
    "projectId": 1,
    "website": {
        "navbar": {
            "backgroundColor": "#121212",
            "textColor": "#ffffff"
        },
        "pages": [
            {
                "name": "Home",
                "backgroundColor": "#161616",
                "components": [
                    {
                        "name": "Greeting",
                        "html": "",
                        "css": "",
                        "content": [
                            {
                                "name": "Greeting",
                                "type": "text",
                                "id": "greeting",
                                "hidden": "false",
                                "text": "Hello",
                                "color": "#ff0000",
                                "fontSize": 34,
                                "fontWeight": 400,
                                "fontFamily": "Arial",
                            },
                            {
                                "name": "Message",
                                "type": "text",
                                "id": "message",
                                "hidden": "false",
                                "text": "How are you doing?",
                                "color": "white",
                                "fontSize": 17,
                                "fontWeight": 400,
                                "fontFamily": "Arial",
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
</script>

<template>
    <div class="editor-page">
        <div class="side-bar">
            <h2>Components</h2>
            <div class="edits">
                <EditorSidebar :project="project" page="Home"/>
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

.side-bar {
    width: 302px;
    background-color: var(--card-color);
    border-top-right-radius: 22px;
    padding: 25px;
    height: 100%;
}

.editor-page {
    display: flex;
    margin-top: 80px;
    height: 100%;
}



</style>
