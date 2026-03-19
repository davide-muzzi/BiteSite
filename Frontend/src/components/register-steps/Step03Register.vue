<script setup>
import { computed } from 'vue';
import { useRegisterStore } from "../../stores/register";
import { ref } from 'vue';
import router from '@/router';

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
    <div class="🦅">
        <div class="paymentinfo-card">
            <h2>Payment Information</h2>
            <form class="register-form" @submit.prevent="handleRegister()">
                <div class="form-group">
                    <input
                        id="cardnumber"
                        type="text"
                        v-model="cardnumber"
                        placeholder="Cardnumber"
                        required
                    />
                </div>
                <div class="form-group">
                        <input
                            id="cardholdername"
                            type="cardholdername"
                            v-model="cardholdername"
                            placeholder="Cardholder Name"
                            required
                        />
                </div>

                <div class="next-to">
                    <div class="form-group-half">
                        <input
                            id="mmyy"
                            type="mmyy"
                            v-model="mmyy"
                            placeholder="MM/YY"
                            required
                        />
                    </div>

                    <div class="form-group-half">
                        <input
                            id="cvv"
                            type="cvv"
                            v-model="cvv"
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>

                <button type="submit" class="payment-button" :disabled="!buttonenabled">
                    Pay
                </button>
            </form>


        </div>

        <div class="overview-card">
            <h2>Overview</h2>

            <div class="overview-content" v-if="selected">
                <h3>{{ selected.name }}</h3>
                <p>{{ selected.currency }} {{ selected.price.toFixed(2) }} {{ selected.period }}</p>

                <div class="features">
                    <p v-for="(f, i) in selected.features" :key="i">{{ f }}</p>
                </div>
            </div>

            <div v-else>
                <p>No subscription selected.</p>
            </div>

        </div>
    </div>
</template>

<style scoped>
body {
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
}

.🦅 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.paymentinfo-card {
    background-color: #ffeede;
    width: 510px;
    height: 460px;
    border-radius: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form-group input {
    width: 445px;
    height: 63px;
    border-radius: 46px;
    border: none;
    font-size: 22px;
    font-family: var(--font);
    margin-top: 12px;
    box-sizing: border-box;
    text-align: center;
}

.next-to {
    display: flex;
    align-items: baseline;
    gap: 6px;
}

.form-group-half input {
    width: 217px;
    height: 63px;
    border-radius: 46px;
    border: none;
    font-size: 22px;
    font-family: var(--font);
    margin-top: 12px;
    box-sizing: border-box;
    text-align: center;
}

.payment-button {
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

.payment-button:hover {
    background-color: var(--button-hover-color);
}

.overview-card {
    background-color: #ffeede;
    width: 422px;
    height: 460px;
    border-radius: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
}

.overview-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
}

.overview-content p {
    margin: 0;
    color: black;
}

.features {
    color: black;
    margin-top: 20px;
}


/*Idea from ChatGPT*/
.payment-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
