<script setup>
import { ref } from 'vue';
import { login } from "@/api/routes/user.js";

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  const result = await login(email.value, password.value);

  if (result.success)
    window.location.href = "/projects-overview";
  else
    errorMessage.value = result.message;
};
</script>

<template>
  <div class="login-page">

    <!-- Left branding panel -->
    <div class="left-panel">
      <div class="panel-body">
        <p class="panel-eyebrow">Restaurant website builder</p>
        <h2 class="panel-headline">Your restaurant's<br />digital home.</h2>
        <ul class="panel-perks">
          <li>No coding required</li>
          <li>Ready-made templates</li>
          <li>Effortless hosting</li>
        </ul>
      </div>
    </div>

    <!-- Right form panel -->
    <div class="right-panel">
      <div class="form-wrap">
        <p class="eyebrow">Welcome back</p>
        <h1>Sign in</h1>
        <p class="sub">Don't have an account? <RouterLink to="/register">Register</RouterLink></p>

        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">E-Mail</label>
            <input id="email" type="email" v-model="email" placeholder="you@example.com" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" placeholder="••••••••" required />
          </div>

          <button type="submit" class="login-button">Sign in</button>
        </form>

        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  min-height: calc(100vh - 72px);
  font-family: var(--font);
}

/* ── Left panel ── */
.left-panel {
  flex: 0 0 420px;
  background: #1b133d;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 48px 52px;
  gap: 0;
}

.panel-body {
  margin-top: auto;
  margin-bottom: auto;
}

.panel-eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 20px;
}

.panel-headline {
  font-size: clamp(28px, 2.5vw, 40px);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 36px;
}

.panel-perks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel-perks li {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  padding-left: 20px;
  position: relative;
}

.panel-perks li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
}

/* ── Right panel ── */
.right-panel {
  flex: 1;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 48px;
}

.form-wrap {
  width: 100%;
  max-width: 440px;
}

.eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 12px;
}

h1 {
  font-size: clamp(32px, 3vw, 44px);
  font-weight: 800;
  color: var(--font-color-dark-blue);
  margin: 0 0 8px;
}

.sub {
  font-size: 15px;
  color: #6b6b8a;
  font-weight: 600;
  margin: 0 0 36px;
}

.sub a {
  color: var(--font-color-dark-blue);
  font-weight: 800;
  text-decoration: none;
}

.sub a:hover {
  text-decoration: underline;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group label {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: var(--font-color-dark-blue);
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  height: 56px;
  border-radius: 999px;
  border: none;
  background: white;
  padding: 0 24px;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 500;
  color: #2b2b2b;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(49, 38, 110, 0.07);
}

.login-button {
  width: 100%;
  height: 56px;
  border-radius: 999px;
  border: none;
  background: var(--accent);
  color: white;
  font-family: var(--font);
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.login-button:hover {
  background: var(--button-hover-color);
  transform: translateY(-2px);
}

.error-message {
  margin-top: 16px;
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}
</style>
