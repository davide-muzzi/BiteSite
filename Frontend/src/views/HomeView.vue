<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="main-content">
    <div class="description">
      <h1>Showcase Your</h1>
      <h1>Restaurant Online in</h1>
      <h1>Minutes</h1>
    </div>
  <div class="buttons">
    <button class="button">Get Started</button>
    <button class="button" @click="router.push('/top-restaurants')"><div class="top-text">Find Restaurants</div><div class="bottom-text">Hosted by us</div></button>
    
  </div>
  <div class="right-bar"></div>
</div>

</template>

<style>
body {
  background: var(--background);
}

.main-content{
  padding-left: 50px;
}
.description{
  padding-top: 50px;
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    line-height: 15px;
}

.button{
  background-color: var(--accent);
  border-radius: 90px;
  height: 70px;
  width: 210px;
  border:none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-weight: 700;
}

.top-text{
  font-size: 18px;
}

.bottom-text{
  font-size: 14px;
  font-weight: 300;
}

.buttons{
  padding-top: 50px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons :hover{
  background-color: var(--button-hover-color);
}

.right-bar {
  position: fixed;
  width: 300px;
  height: 100vh;
  right: 0px;
  top: 0px;
  background-color: var(--accent);
}
</style>