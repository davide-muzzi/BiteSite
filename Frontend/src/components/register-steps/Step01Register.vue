<script setup>
    import { ref } from 'vue';

    const username = ref('');
    const email = ref('');
    const password = ref('');

    const handleregister = async () => {

      console.log("register with:", email.value, password.value);
    };

</script>

<template>
    <div class="register-card">
            <form class="register-form" @submit.prevent="handleregister">
                
                <div class="form-group">
                    <label for ="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        v-model="username"
                        placeholder="Username..."
                        required
                    />
                </div>
                
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

                <button type="submit" class="register-button">
                    register
                </button>

            </form>
            

             <p class="register-text">
                Already have an account? <RouterLink to="/login">Login</RouterLink>
             </p>

        </div>
</template>

<style scoped>
body {
  background: var(--background);
  font-family: var(--font);
  color: var(--font-color-dark-blue);
}

.register-card {
  background-color: #d9b99c;
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

.register-button {
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

.register-button:hover {
  background-color: var(--button-hover-color);
}

.register-text {
  font-size: 18px;
  font-weight: 600;
}
</style>