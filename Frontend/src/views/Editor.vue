<script setup>
import { ref } from "vue";
import EditorSidebar from "@/components/editor-sidebar/EditorSidebar.vue";

const project = ref({
    "projectId": 1,
    "website": {
        "navbar": {
            "backgroundColor": "#121212",
            "textColor": "#ffffff",
            "height": "60px",
            "width": "100%",
            "borderRadius": "0px",
            "containerCss": {

            },
            "barCss": {

            },
            "itemCss": {

            },
            "titleCss": {

            }
        },
        "pages": [
            {
                "name": "Home",
                "backgroundColor": "#161616",
                "content": [
                    {
                        "name": "Greeting",
                        "text": "Hello",
                        "fontColor": "white",
                        "fontWeight": 400,
                        "fontFamily": "Arial",
                        "html": "<div>§text§</div>",
                        "additionalCss": {
                            "width": "100%",
                            "height": "200px",
                            "background-color": "white",
                            "display": "flex",
                            "justifty-content": "center",
                            "align-items": "center"
                        }
                    },
                    {
                        "name": "Greeting",
                        "text": "Hello",
                        "fontColor": "white",
                        "fontWeight": 400,
                        "fontFamily": "Arial",
                        "html": "<div>§text§</div>",
                        "additionalCss": {
                            "width": "100%",
                            "height": "200px",
                            "background-color": "white",
                            "display": "flex",
                            "justifty-content": "center",
                            "align-items": "center"
                        }
                    },
                    {
                        "name": "Greeting",
                        "text": "Hello",
                        "fontColor": "white",
                        "fontWeight": 400,
                        "fontFamily": "Arial",
                        "html": "<div>§text§</div>",
                        "additionalCss": {
                            "width": "100%",
                            "height": "200px",
                            "background-color": "white",
                            "display": "flex",
                            "justifty-content": "center",
                            "align-items": "center"
                        }
                    }
                ]
            },
            {
                "name": "Menu",
                "backgroundColor": "#ff0000",
                "content": [
                    {
                        "name": "Greeting",
                        "html": "<div>§Hello here too!§</div>",
                        "css": {
                            "width": "100%",
                            "height": "200px",
                            "background-color": "blue",
                            "display": "flex",
                            "justifty-content": "center",
                            "align-items": "center"
                        }
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
