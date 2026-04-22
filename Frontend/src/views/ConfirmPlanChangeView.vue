<script setup> /*kopiert aus den Regristrationssteps*/
import { computed } from 'vue';
import { useRegisterStore } from '@/stores/register.js';
import { ref } from 'vue';
import router from '@/router';
import { editSubscription } from "@/api/routes/user.js";


const store = useRegisterStore();
const selected = computed(() => store.subscription);

const isLoading = ref(false);
const errorMessage = ref("");

const handleConfirm = async () => {
    if (!selected.value) return;

    isLoading.value = true;
    errorMessage.value = "";

    try {
        await editSubscription(selected.value.id);
        router.push("/user-settings");
    } catch (e) {
        errorMessage.value = "Something went wrong. Please try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="🦅">
        <div class="overview-card">
            <h2>Change Subscription</h2>

            <div class="overview-content" v-if="selected">
                <h3>{{ selected.name }}</h3>
                <p>{{ selected.currency }} {{ selected.price.toFixed(2) }} {{ selected.period }}</p>

                <div class="features">
                    <p v-for="(f, i) in selected.features" :key="i">{{ f }}</p>
                </div>

                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

                <button
                    class="confirm-button"
                    @click="handleConfirm"
                    :disabled="isLoading"
                >
                    {{ isLoading ? "Processing..." : "Confirm Change" }}
                </button>
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

.overview-card {
    background-color: #ffeede;
    width: 510px;
    min-height: 460px;
    border-radius: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    box-sizing: border-box;
}

.overview-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    width: 100%;
}

.overview-content p {
    margin: 0;
    color: black;
}

.features {
    color: black;
    margin-top: 20px;
    margin-bottom: 30px;
}

.confirm-button {
    width: 445px;
    height: 63px;
    border-radius: 46px;
    border: none;
    margin-top: 20px;
    background-color: var(--accent);
    color: white;
    font-size: 22px;
    cursor: pointer;
    font-weight: 600;
    box-sizing: border-box;
}

.confirm-button:hover {
    background-color: var(--button-hover-color);
}

.confirm-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
}
</style>
