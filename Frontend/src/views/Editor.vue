<script setup>
import { ref } from "vue";
import EditorSidebar from "@/components/editor-sidebar/EditorSidebar.vue";

const project = ref({
	"projectId": 1,
	"website": {
    "navbar": {
      "name": "Navbar",
      "content": [
        {
          "name": "Title",
          "types": [
            "text"
          ],
          "text": "Cool website",
          "style": {
            "color": "green",
            "fontFamily": "Hack Nerd Font Mono",
            "fontSize": "22px",
            "fontWeight": 600
          }
        },
        {
          "name": "Navigation",
          "types": [
            "text",
            "ro-text"
          ],
          "style": {
            "color": "green",
            "fontFamily": "Hack Nerd Font Mono",
            "fontSize": "15px",
            "fontWeight": 600
          }
        },
        {
          "name": "Bar",
          "types": [
            "bar"
          ],
          "style": {
            "backgroundColor": "black",
            "height": "50px"
          }
        }
      ],
    },
    "pages": [
			{
				"name": "Home",
				"backgroundColor": "#161616",
				"components": [
					{
						"name": "Greeting",
						"html": "<div class=\"container\"><div class=\"greeting\">§greeting§</div><div class=\"message\">§message§</div></div>",
						"content": [
							{
								"name": "Container",
								"types": [
									"container"
								],
								"id": "container",
								"hidden": false,
								"style": {
									"backgroundColor": "green",
									"height": "200px",
									"width": "100%",
									"justifyContent": "center",
									"alignItems": "center",
									"flexDirection": "column",
									"gap": "20px",
									"padding": "20px"
								}
							},
							{
								"name": "Greeting",
								"types": [
									"text"
								],
								"id": "greeting",
								"hidden": false,
								"text": "Hello",
								"style": {
									"color": "black",
									"fontSize": "45px",
									"fontWeight": 700,
									"fontFamily": "Arial"
								}
							},
							{
								"name": "Message",
								"types": [
									"text"
								],
								"id": "message",
								"hidden": false,
								"text": "How are you doing?",
								"style": {
									"color": "black",
									"fontSize": "17px",
									"fontWeight": 400,
									"fontFamily": "Arial"
								}
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
