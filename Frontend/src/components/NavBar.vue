<script setup>
</script>

<template>
    <div class="top">
        <h1 class="title">BiteSite</h1>
        <div class="navbar-items">
            <h2>Restaurants</h2>
            <h2>What BiteSite offers</h2>
            <h2>Login</h2>
        </div>
    </div>
</template>

<style>
.title {
    color: var(--accent);
    cursor: pointer;
}

.top {
    padding-left: 50px;
    display: flex;
    gap: 30px;
    align-items: baseline;
    font-family: var(--font);
    cursor: pointer;

    position: relative;
    z-index: 10;
}

.navbar-items {
    display: flex;
    gap: 30px;
    color: var(--font-color-dark-blue);
    cursor: pointer;
    font-size: 13px;
}
</style>