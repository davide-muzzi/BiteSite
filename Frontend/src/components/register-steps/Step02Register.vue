<script setup>
import { useRegisterStore } from "../../stores/register";
import router from "@/router";
import { Check } from "lucide-vue-next";

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
        "Limited Templates",
    ],
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
        "Newsletter automation",
    ],
};

const plans = [beginnerPlan, masterChefPlan];

function selectPlan(plan) {
    store.setSubscription(plan);
    router.push("/register/step-3");
}
</script>

<template>
    <section class="plan-section">
        <header class="section-header">
            <h2>Choose your plan</h2>
            <p>All plans include secure hosting, template access, and concierge onboarding.</p>
        </header>

        <div class="plan-grid">
            <article v-for="plan in plans" :key="plan.id" class="plan-card"
                :class="{ 'plan-card--highlight': plan.id === 'masterchef' }">
                <header class="plan-header">
                    <p class="eyebrow">{{ plan.id === 'masterchef' ? 'Scale faster' : 'Get started' }}</p>
                    <h2>{{ plan.name }}</h2>
                    <div class="price">
                        <h3>{{ plan.currency }} {{ plan.price.toFixed(2) }}</h3>
                        <p>{{ plan.period }}</p>
                    </div>
                </header>

                <ul class="feature-list">
                    <li v-for="feature in plan.features" :key="feature">
                        <Check class="feature-icon" />
                        <span>{{ feature }}</span>
                    </li>
                </ul>

                <button class="plan-button" @click="selectPlan(plan)">
                    {{ plan.id === 'masterchef' ? 'Choose MasterChef' : 'Choose Beginner' }}
                </button>
            </article>
        </div>
    </section>
</template>

<style scoped>
.plan-section {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
    text-align: left;
    font-family: var(--font);
    color: var(--font-color-dark-blue);
}

.section-header {
    text-align: center;
}

.section-header h2 {
    margin: 10px 0 8px;
    font-size: 36px;
    font-weight: 800;
}

.section-header p {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    color: rgba(33, 33, 33, 0.7);
}

.plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 28px;
    width: 100%;
}

.plan-card {
    background: #fff;
    border: 1px solid #f0dcd0;
    border-radius: 32px;
    padding: 32px 34px 38px;
    box-shadow: 0 32px 70px rgba(49, 38, 110, 0.12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.plan-card--highlight {
    border: 2px solid rgba(253, 4, 60, 0.35);
}

.plan-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 40px 90px rgba(49, 38, 110, 0.18);
}

.plan-header h2 {
    margin: 4px 0 10px;
    font-size: 28px;
    font-weight: 800;
}

.eyebrow {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 12px;
    font-weight: 700;
    color: rgba(49, 38, 110, 0.6);
}

.price {
    display: flex;
    align-items: baseline;
    gap: 6px;
    color: #111;
}

.price h3 {
    margin: 0;
    font-size: 30px;
    font-weight: 800;
}

.price p {
    margin: 0;
    opacity: 0.5;
    font-weight: 700;
}

.feature-list {
    list-style: none;
    padding: 0;
    margin: 18px 0 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.feature-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    color: rgba(30, 30, 30, 0.9);
}

.feature-icon {
    width: 18px;
    height: 18px;
    color: var(--accent);
    flex-shrink: 0;
}

.plan-button {
    width: 100%;
    height: 56px;
    border-radius: 999px;
    border: none;
    background-color: var(--accent);
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    transition: background 0.2s ease, transform 0.2s ease;
}

.plan-button:hover {
    background-color: var(--button-hover-color);
    transform: translateY(-2px);
}
</style>
