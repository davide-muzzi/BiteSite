<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = async () => {

  console.log("Login with:", email.value, password.value);
};

</script>

<template>

    <button class="back-button">
        <RouterLink to="/">< Back</RouterLink>
    </button>

    <div class="account-page">
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

            </form>
            
            <button type="submit" class="login-button">
                Login
            </button>

             <p class="register-text">
                Don't have an account? <RouterLink to="/register">Register</RouterLink>
             </p>

        </div>
    </div>
</template>

<style scoped>
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
  width: 517px; 
  height: 580px; 
  border-radius: 46px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-group label {
  display: block;
  font-size: 22px;
  display: flex;
  justify-content: center;
  margin-top: 14px;
  font-weight: 600;
}

.form-group input {
  width: 445px;
  height: 63px;
  border-radius: 46px;
  border: none;
  font-size: 22px;
  font-family: var(--font);
  margin-top: 12px;
  padding-left: 29px;
  padding-right: 29px;
  box-sizing: border-box;
}

.login-button {
  width: 445px;
  height: 63px;
  border-radius: 46px;
  border: none;
  margin-top: 45px;
  background-color: var(--accent);
  color: white;
  font-size: 22px;
  cursor: pointer;
  font-weight: 600;
  box-sizing: border-box;
}

.login-button:hover {
    background-color: var(--button-hover-color);
}

.register-text {
    font-size: 18px;
    font-weight: 600;
}

.back-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: var(--font-color-dark-blue);
    font-weight: 600;
    margin-left: 70px;
    font-family: var(--font);
}

.back-button > a {
    text-decoration: none;
}
</style>