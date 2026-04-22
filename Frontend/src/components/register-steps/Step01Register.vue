<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/stores/register.js';
import { checkRegister } from '@/api/routes/user.js';

const registerStore = useRegisterStore();

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');

const errorMessage = ref('');


const handleregister = async () => {
    if (!username.value.trim()) return;
    if (!email.value.includes("@")) return;
    if (password.value.length < 3) return;

    const result = await checkRegister(username.value, email.value);

    if (!result.success) {
        return errorMessage.value = result.message;
    }

    registerStore.setRegisterData(username.value, password.value, email.value);

    router.push("/register/step-2");
};
</script>

<template>
    <section class="step-card">
    <header class="card-header">
      <h2>Tell us about you</h2>
    </header>

        <form class="register-form" @submit.prevent="handleregister">
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" type="text" v-model="username" placeholder="Username..." required />
            </div>

            <div class="form-group">
                <label for="email">E-Mail</label>
                <input id="email" type="email" v-model="email" placeholder="E-Mail..." required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" placeholder="Password..." required />
            </div>

            <button type="submit" class="register-button">
                Register
            </button>
        </form>

        <p class="register-text">
            Already have an account? <RouterLink to="/login">Login</RouterLink>
        </p>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
    </section>
</template>

<style scoped>
.step-card {
    width: 100%;
    max-width: 560px;
    background: #fff;
    border-radius: 32px;
    padding: 38px 48px 42px;
    box-shadow: 0 32px 70px rgba(49, 38, 110, 0.12);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    box-sizing: border-box;
}

.card-header h2 {
    margin: 6px 0;
    font-size: 32px;
    font-weight: 800;
}

.eyebrow {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 13px;
    font-weight: 700;
    color: rgba(49, 38, 110, 0.75);
}

.card-header p {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: rgba(33, 33, 33, 0.7);
}

.register-form {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 22px;
}

.form-group label {
    display: block;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
}

.form-group input {
    width: 100%;
    height: 60px;
    border-radius: 999px;
    border: none;
    background: #f9f6f1;
    padding: 0 28px;
    font-size: 18px;
    font-weight: 600;
    box-sizing: border-box;
}

.register-button {
    width: 100%;
    height: 60px;
    border-radius: 999px;
    border: none;
    margin-top: 8px;
    background-color: var(--accent);
    color: white;
    font-size: 18px;
    font-weight: 700;
    transition: background 0.2s ease, transform 0.2s ease;
}

.register-button:hover {
    background-color: var(--button-hover-color);
    transform: translateY(-2px);
}

.register-text {
    margin-top: 30px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
}

.error-message {
  margin-top: 16px;
  color: red;
  text-align: center;
}
</style>
