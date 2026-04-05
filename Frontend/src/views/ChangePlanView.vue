<script setup>/*kopiert aus den Regristrationssteps*/
import { Check } from "lucide-vue-next";
import { useRegisterStore } from '@/stores/register.js';
import router from "@/router";

const store = useRegisterStore();

const beginnerPlan = {
    id: "beginner",
    name: "BiteSite Beginner",
    currency: "CHF",
    price: 14.95,
    period: "/Month",
    features: [
        "One Website",
        "Direct Hosting",
        "Restaurant specific SEO",
        "Reservation possible",
        "Limited Templates"
    ]
};

const masterChefPlan = {
    id: "masterchef",
    name: "BiteSite MasterChef",
    currency: "CHF",
    price: 49.95,
    period: "/Month",
    features: [
        "Unlimited Websites",
        "Direct Hosting",
        "Restaurant specific SEO",
        "Reservation possible",
        "All Templates",
        "Consulting",
        "Newsletter automation"
    ]
};

function selectPlan(plan) {
    store.setSubscription(plan);
    router.push("/change-plan/confirm");
}
</script>

<template>
    <div class="beginner-card">
        <h2>BiteSite Beginner</h2>
        <div class="price">
            <h3>CHF 14.95</h3>
            <p>/Month</p>
        </div>
        <button class="select-beginner" @click="selectPlan(beginnerPlan)">Change</button>
        <div class="beginner-text">
            <p v-for="feature in beginnerPlan.features" :key="feature" class="feature-row">
                <Check class="feature-icon" />
                <span>{{ feature }}</span>
            </p>
        </div>
    </div>

    <div class="masterchef-card">
        <h2>BiteSite MasterChef</h2>
        <div class="price">
            <h3>CHF 49.95</h3>
            <p>/Month</p>
        </div>
        <button class="select-masterchef" @click="selectPlan(masterChefPlan)">Wechseln</button>
        <div class="masterchef-text">
            <p v-for="feature in masterChefPlan.features" :key="feature" class="feature-row">
                <Check class="feature-icon" />
                <span>{{ feature }}</span>
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

.beginner-card {
    background-color: #ffeede;
    width: 607px;
    height: 341px;
    border-radius: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.price {
    display: flex;
    align-items: baseline;
    gap: 6px;
    color: black;
}

.price h3 {
    margin: 0;
}

.price p {
    margin: 0;
    opacity: 0.4;
}

.beginner-card button {
    width: 445px;
    height: 46px;
    border-radius: 66px;
    border: none;
    margin-top: 10px;
    background-color: var(--accent);
    color: white;
    font-size: 22px;
    cursor: pointer;
    font-weight: 600;
    box-sizing: border-box;
}

.beginner-card button:hover {
    background-color: var(--button-hover-color);
}

.beginner-card .beginner-text {
    color: #000000;
    font-weight: 600;
}

.feature-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 8px 0;
}

.feature-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: var(--accent);
    stroke-width: 2.5;
}

.masterchef-card {
    background-color: #ffeede;
    width: 607px;
    height: 485px;
    border-radius: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 74px;
    margin-bottom: 70px;
}

.masterchef-card button {
    width: 445px;
    height: 46px;
    border-radius: 66px;
    border: none;
    margin-top: 10px;
    background-color: var(--accent);
    color: white;
    font-size: 22px;
    cursor: pointer;
    font-weight: 600;
    box-sizing: border-box;
}

.masterchef-card button:hover {
    background-color: var(--button-hover-color);
}

.masterchef-card .masterchef-text {
    color: #000000;
    font-weight: 600;
}
</style>
