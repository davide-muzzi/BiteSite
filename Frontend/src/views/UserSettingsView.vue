<script setup>
import { ref } from "vue";
import BackButton from "@/components/BackButton.vue";
import { logout } from "@/api/routes/user.js";
import { editUser } from "@/api/routes/user.js";

const username = ref("Julian");
const email = ref("E@Mail.com");

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

const handleLogout = async () => {
  const result = await logout();

  if (result.success) window.location.href = "/";

}

const handleEditUser = async () => {
  await editUser(username.value, email.value)
}
</script>

<template>
    <section class="user-settings-view">
        <BackButton class="user-settings-back" />

        <div class="page-header">
            <h1>User Settings</h1>
            <p>Update your personal details and manage your BiteSite access.</p>
        </div>

        <div class="settings-card">
            <form class="form-area" @submit.prevent="saveSettings">
                <div class="field-group">
                    <label for="username">Username</label>
                    <input id="username" v-model="username" type="text" />
                </div>

                <div class="field-group">
                    <label for="email">E-Mail</label>
                    <input id="email" v-model="email" type="email" />
                </div>

                <div class="action-row">
                    <div>
                        <p class="action-label">Plan</p>
                        <button class="link-btn" type="button" @click="changePlan">
                            Change Plan
                        </button>
                    </div>

                    <div>
                        <p class="action-label">Password</p>
                        <button class="link-btn" type="button" @click="changePassword">
                            Change Password
                        </button>
                    </div>
                </div>

                <div class="button-row">
                    <button class="save-button" type="submit" @click="handleEditUser()">
                      Save Changes
                    </button>
                    <button class="logout-button" type="button" @click="handleLogout()">
                        Logout
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped>
.user-settings-view {
    min-height: calc(100vh - 160px);
    padding: 42px 78px 80px;
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    box-sizing: border-box;
}

.user-settings-back {
    margin-bottom: 18px;
}

.page-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 30px;
}

.page-header h1 {
    margin: 0 0 6px;
    font-size: 48px;
    font-weight: 800;
}

.page-header p {
    margin: 0;
    font-size: 18px;
    color: rgba(32, 32, 32, 0.65);
    font-weight: 600;
}

.settings-card {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    background: white;
    border-radius: 28px;
    box-shadow: 0 24px 60px rgba(49, 38, 110, 0.08);
    padding: 40px 48px;
}

.form-area {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.field-group label {
    display: block;
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 18px;
}

.field-group input {
    width: 100%;
    height: 64px;
    border-radius: 999px;
    border: none;
    background: #f9f6f1;
    padding: 0 28px;
    font-size: 18px;
    font-weight: 600;
    box-sizing: border-box;
}

.action-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.action-label {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(32, 32, 32, 0.7);
}

.link-btn {
    border: none;
    background: transparent;
    color: var(--font-color-dark-blue);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s ease;
}

.link-btn:hover {
    opacity: 0.7;
}

.button-row {
    display: flex;
    gap: 12px;
}

.save-button,
.logout-button {
    flex: 1;
    height: 60px;
    border-radius: 999px;
    border: none;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.save-button {
    background: var(--accent);
    color: white;
}

.save-button:hover {
    background: var(--button-hover-color);
    transform: translateY(-1px);
}

.logout-button {
    background: rgba(49, 38, 110, 0.08);
    color: var(--font-color-dark-blue);
}

.logout-button:hover {
    background: rgba(49, 38, 110, 0.15);
    transform: translateY(-1px);
}
</style>
