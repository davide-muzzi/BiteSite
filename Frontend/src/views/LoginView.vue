<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = async () => {

  console.log("Login with:", email.value, password.value);
};

</script>

<template>
    <div class="account-page">
        <div class="login-card">
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
    </div>
</template>

<style>
body {
  background: var(--background);
  font-family: var(--font);
  color: var(--font-color-dark-blue);
}

.account-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}


.login-card {
  background-color: #ffeede;
  width: 738px; /* from figma */
  height: 614px; 
  border-radius: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form-group input {
    width: 635px;
    height: 90px;
    border-radius: 66px;
    border: none;
    padding: 0 20px;
    font-size: 32px;
    font-family: var(--font);
}
</style>