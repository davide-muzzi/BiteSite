<script setup>
import { ref } from 'vue';
import BackButton from '@/components/BackButton.vue';
import { login } from "@/api/routes/user.js";

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  const result = await login(email.value, password.value);

  if (result.success) window.location.href = "/projects-overview";
};

</script>

<template>
    <section class="login-view">
        <BackButton />

        <div class="page-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue building and managing your BiteSite presence.</p>
        </div>

        <div class="login-card">
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">E-Mail</label>
                    <input
                        id="email"
                        type="email"
                        v-model="email"
                        placeholder="E-Mail..."
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        v-model="password"
                        placeholder="Password..."
                        required
                    />
                </div>

                <button type="submit" class="login-button">
                    Login
                </button>
            </form>

            <p class="register-text">
                Don't have an account?
                <RouterLink to="/register">Register</RouterLink>
            </p>
        </div>
    </section>
</template>

<style scoped>
.login-view {
  min-height: calc(100vh - 160px);
  padding: 42px 78px 80px;
  background: var(--background);
  font-family: var(--font);
  color: var(--font-color-dark-blue);
  box-sizing: border-box;
}

.page-header {
  margin: 32px auto;
  max-width: 520px;
  text-align: center;
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

.login-card {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  background: white;
  border-radius: 28px;
  padding: 40px 48px 48px;
  box-shadow: 0 28px 60px rgba(49, 38, 110, 0.12);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group label {
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.form-group input {
  width: 100%;
  height: 64px;
  border-radius: 999px;
  border: none;
  background: #f9f6f1;
  padding: 0 28px;
  font-family: var(--font);
  font-size: 18px;
  font-weight: 600;
  color: #2b2b2b;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  height: 64px;
  border-radius: 999px;
  border: none;
  background-color: var(--accent);
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.login-button:hover {
  background-color: var(--button-hover-color);
  transform: translateY(-2px);
}

.register-text {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

.register-text a {
  color: var(--font-color-dark-blue);
  font-weight: 800;
}
</style>
