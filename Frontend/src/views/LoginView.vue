<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = async () => {

  console.log("Login with:", email.value, password.value);
};

</script>

<template>
    <div class="login-card">
        <h1 class="login-title">Login</h1>

        <form class="login-form" @submit.prevent="handleLogin">
            <!-- email -->
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

            <!-- password -->
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

        </form>
    </div>
</template>

<style>
body {
  background: var(--background);
}

.login-card {
  background-color: #ffeede;
  width: 400px;
  height: 300px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>