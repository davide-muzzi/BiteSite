<script setup>
import Background from './component-properties/Background.vue'
import Title from './component-properties/Title.vue'
import EditorComponent from './EditorComponent.vue'
</script>

<template>
  <aside class="sidebar">
    <EditorComponent title="Background picture">
      <Background />
    </EditorComponent>

    <EditorComponent title="Title">
      <Title />
    </EditorComponent>
  </aside>
</template>