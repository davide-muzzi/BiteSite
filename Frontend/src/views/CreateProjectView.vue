<script setup>
import { ref } from 'vue';

const projectName =ref("");

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
    <div class="mainContent">
        <h2 class="title">Name</h2>
        <input 
            type="text" 
            placeholder="Enter project name ..."
            class="inputField"
            v-model="projectName";
        >
        <h2 class="title">Tags</h2>
        <div class="tags">
            <div class="tag" v-for="tag in tags" :key="tag.tagName">
                {{tag.tagName}}  
                <button @click="deleteTag(tag.tagName)" class="deleteTagBtn">x</button>
            </div>
        </div>
        <div class="newTagLabel">
            <input 
            class="tagInputField"
            v-model="newTag"
            type="text" 
            placeholder="Pizza"
            @keydown.enter.prevent="addTag()"
            >
            <button 
                @click="addTag"
                class="addTagBtn"
                >
                +
            </button>
        </div>
        
            <h2></h2>
        <button class="createBtn" @click="create">
            Create
        </button>
    </div>
</template>

<style>

.mainContent{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title{
    color: var(--font-color-dark-blue);
    font-family: var(--font);
}

.tags{
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 20px;
    flex-wrap: wrap;
    max-width: 300px;
    min-width: 300px;
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 10px;
}
.tag{
    background-color: var(--font-color-dark-blue);
    color: white;
    font-family: var(--font);
    padding: 6px;
    border-radius: 5px;
}

.deleteTagBtn{
    background-color: var(--font-color-dark-blue);
    color: white;
}

.addTagBtn{
    background-color: var(--accent);
    border-radius: 66px;
    height: 30px;
    width: 30px;
    color: white;
}

.inputField{
    width: 280px;
    border: none;
    padding: 10px;
    border-radius: 22px;
}

.tagInputField{
    width: 240px;
    border: none;
    padding: 10px;
    border-radius: 22px;
}

.createBtn{
    height: 50px;
    border-radius: 66px;
    border: none;
    margin-top: 32px;
    background-color: var(--accent);
    color: white;
    font-size: 26px;
    cursor: pointer;
    box-sizing: border-box;
    margin-bottom: 0;
    width: 300px;
}

.newTagLabel{
    display: flex; 
    flex-direction: row;
    gap: 10px;
    align-items: baseline;
}
</style>