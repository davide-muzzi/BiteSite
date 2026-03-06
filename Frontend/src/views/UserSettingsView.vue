<script setup>
import { ref } from "vue";
import { ChevronLeft } from "lucide-vue-next";

const username = ref("Julian");
const email = ref("E@Mail.com");

function goBack() {
    console.log("Back clicked");
    window.history.back();
}

function changePlan() {
    console.log("Change Plan clicked");
}

function changePassword() {
    console.log("Change Password clicked");
}

function saveSettings() {
    console.log("Save clicked", {
        username: username.value,
        email: email.value,
    });
}

function logout() {
    console.log("Logout clicked");
}
</script>

<template>
    <section class="user-settings-page">
        <div class="shape shape-top-right"></div>
        <div class="shape shape-bottom-left"></div>

        <button class="back-button" @click="goBack">
            <ChevronLeft :size="18" />
            <span>Back</span>
        </button>

        <div class="settings-content">
            <div class="form-area">
                <div class="field-group">
                    <label for="username">Username</label>
                    <input id="username" v-model="username" type="text" />
                </div>

                <div class="field-group">
                    <label for="email">E-Mail</label>
                    <input id="email" v-model="email" type="email" />
                </div>

                <div class="action-block">
                    <p class="action-label">Plan</p>
                    <button class="text-action" @click="changePlan">Change Plan</button>
                </div>

                <div class="action-block">
                    <p class="action-label">Password</p>
                    <button class="text-action" @click="changePassword">
                        Change Password
                    </button>
                </div>

                <button class="save-button" @click="saveSettings">Save</button>
            </div>

            <div class="logout-area">
                <button class="logout-button" @click="logout">Logout</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.user-settings-page {
    position: relative;
    min-height: calc(100vh - 160px);
    width: 100%;
    overflow: hidden;
    padding: 28px 56px 64px;
    box-sizing: border-box;
}

.settings-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 620px;
    padding-top: 70px;
    z-index: 2;
}

.back-button {
    position: relative;
    margin-left: 0;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    background: transparent;
    color: var(--font-color-dark-blue);
    font-family: var(--font);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.back-button:hover {
    opacity: 0.75;
    transform: translateX(-2px);
}

.form-area {
    width: 100%;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.field-group {
    width: 100%;
    max-width: 520px;
    margin-bottom: 28px;
}

.field-group label {
    display: block;
    margin-bottom: 10px;
    color: var(--font-color-dark-blue);
    font-family: var(--font);
    font-size: 20px;
    font-weight: 700;
}

.field-group input {
    width: 100%;
    height: 64px;
    border: none;
    outline: none;
    border-radius: 999px;
    background: white;
    padding: 0 28px;
    box-sizing: border-box;
    font-family: var(--font);
    font-size: 20px;
    font-weight: 700;
    color: #111;
}

.action-block {
    margin-top: 8px;
    margin-bottom: 16px;
}

.action-label {
    margin: 0 0 6px;
    color: var(--font-color-dark-blue);
    font-family: var(--font);
    font-size: 20px;
    font-weight: 700;
}

.text-action {
    border: none;
    background: transparent;
    padding: 0;
    font-family: var(--font);
    font-size: 20px;
    font-weight: 700;
    color: #111;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.text-action:hover {
    opacity: 0.7;
    transform: scale(1.02);
}

.save-button {
    margin-top: 26px;
    width: 100%;
    max-width: 520px;
    height: 64px;
    border: none;
    border-radius: 999px;
    background: var(--accent);
    color: white;
    font-family: var(--font);
    font-size: 22px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.save-button:hover {
    background: var(--button-hover-color);
    transform: translateY(-1px);
}

.logout-area {
    position: absolute;
    right: 70px;
    bottom: 120px;
}

.logout-button {
    min-width: 150px;
    height: 58px;
    border: none;
    border-radius: 999px;
    background: var(--accent);
    color: white;
    font-family: var(--font);
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.logout-button:hover {
    background: var(--button-hover-color);
    transform: translateY(-1px);
}

.shape {
    position: absolute;
    background: var(--accent);
    z-index: 1;
    pointer-events: none;
}

.shape-top-right {
    top: -120px;
    right: 0;
    width: 210px;
    height: 420px;
    border-bottom-left-radius: 160px;
}

.shape-bottom-left {
    left: 0;
    bottom: -100px;
    width: 320px;
    height: 320px;
    border-top-right-radius: 170px;
}
</style>