<script setup>
import { computed, ref } from 'vue';
import { useRegisterStore } from "../../stores/register";
import router from '@/router';
import { Check } from "lucide-vue-next";

const cardnumber = ref("");
const cardholdername = ref("");
const mmyy = ref("");
const cvv = ref("");

const store = useRegisterStore();

const selected = computed(() => store.subscription);

const buttonenabled = computed(() => {
  return (
    cardnumber.value &&
    cardholdername.value &&
    mmyy.value &&
    cvv.value
  );
});

const handleRegister = async () => {
  const result = await store.register();

  if (result.success) router.push("/login");
};
</script>

<template>
  <section class="checkout-grid">
    <article class="step-card">
      <header class="card-header">
        <p class="eyebrow">Payment</p>
        <h2>Secure payment information</h2>
        <p>We use industry best practices to keep your data protected.</p>
      </header>

      <form class="register-form" @submit.prevent="handleRegister()">
        <div class="form-group">
          <label for="cardnumber">Card Number</label>
          <input
            id="cardnumber"
            type="text"
            inputmode="numeric"
            autocomplete="cc-number"
            v-model="cardnumber"
            placeholder="1234 5678 9101 1121"
            required
          />
        </div>

        <div class="form-group">
          <label for="cardholdername">Cardholder Name</label>
          <input
            id="cardholdername"
            type="text"
            autocomplete="cc-name"
            v-model="cardholdername"
            placeholder="Full Name"
            required
          />
        </div>

        <div class="form-split">
          <div class="form-group">
            <label for="mmyy">Expiry</label>
            <input
              id="mmyy"
              type="text"
              inputmode="numeric"
              autocomplete="cc-exp"
              v-model="mmyy"
              placeholder="MM/YY"
              required
            />
          </div>

          <div class="form-group">
            <label for="cvv">CVV</label>
            <input
              id="cvv"
              type="password"
              inputmode="numeric"
              autocomplete="cc-csc"
              maxlength="4"
              v-model="cvv"
              placeholder="123"
              required
            />
          </div>
        </div>

        <button type="submit" class="payment-button" :disabled="!buttonenabled">
          Pay
        </button>
      </form>
    </article>

    <article class="step-card overview-card">
      <header class="card-header">
        <p class="eyebrow">Overview</p>
        <h2>Your selection</h2>
        <p v-if="selected">{{ selected.name }} subscription</p>
      </header>

      <div v-if="selected" class="overview-content">
        <p class="price">
          {{ selected.currency }} {{ selected.price.toFixed(2) }}
          <span>{{ selected.period }}</span>
        </p>

        <ul class="feature-list">
          <li v-for="(f, i) in selected.features" :key="i">
            <Check class="feature-icon" />
            <span>{{ f }}</span>
          </li>
        </ul>
      </div>

      <p v-else>No subscription selected.</p>
    </article>
  </section>
</template>

<style scoped>
.checkout-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  font-family: var(--font);
  color: var(--font-color-dark-blue);
}

.step-card {
  background: #fff;
  border-radius: 32px;
  padding: 32px 36px 40px;
  box-shadow: 0 32px 70px rgba(49, 38, 110, 0.12);
  display: flex;
  flex-direction: column;
}

.card-header h2 {
  margin: 6px 0;
  font-size: 28px;
  font-weight: 800;
}

.card-header p {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: rgba(40, 40, 40, 0.7);
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  font-weight: 700;
  color: rgba(49, 38, 110, 0.7);
}

.register-form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 700;
}

.form-group input {
  width: 100%;
  height: 56px;
  border-radius: 999px;
  border: none;
  background: #f9f6f1;
  padding: 0 24px;
  font-size: 17px;
  font-weight: 600;
  box-sizing: border-box;
}

.form-split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.payment-button {
  width: 100%;
  height: 60px;
  border-radius: 999px;
  border: none;
  margin-top: 8px;
  background-color: var(--accent);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  transition: background 0.2s ease, transform 0.2s ease;
}

.payment-button:hover:enabled {
  background-color: var(--button-hover-color);
  transform: translateY(-2px);
}

.payment-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.overview-card {
  min-height: 100%;
}

.overview-content {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.price {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
}

.price span {
  font-size: 16px;
  font-weight: 700;
  color: rgba(30, 30, 30, 0.6);
  margin-left: 8px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: rgba(30, 30, 30, 0.9);
}

.feature-icon {
  width: 18px;
  height: 18px;
  color: var(--accent);
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .step-card {
    padding: 28px 26px 32px;
  }
}
</style>
