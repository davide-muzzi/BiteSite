<script setup>
import { Check } from "lucide-vue-next";
import BackButton from "@/components/BackButton.vue";
import { useRegisterStore } from "@/stores/register.js";
import router from "@/router";
import { cancelSubscription } from "@/api/routes/user.js";

const store = useRegisterStore();

const beginnerPlan = {
    id: "beginner",
    name: "BiteSite Beginner",
    currency: "CHF",
    price: 14.95,
    period: "/Month",
    description: "A simple setup for one restaurant site with the essentials in place.",
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
    description: "For teams managing multiple concepts and a broader marketing workflow.",
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
    router.push("/change-plan/confirm");
}

const handleCancelSubscription = async () => {
  const result = await cancelSubscription()

  if (result.success)
    window.location.href = "/user-settings";
  else
    errorMessage.value = result.message;
}

</script>

<template>
    <main class="change-plan-view">
        <section class="change-plan-section">
            <BackButton class="change-plan-back" />

            <header class="section-header">
                <p class="eyebrow">Subscription</p>
                <h1>Change your plan</h1>
                <p class="section-copy">
                    Compare your current options and switch to the plan that fits your restaurant best.
                </p>
            </header>

            <div class="plan-grid">
                <article
                    v-for="plan in plans"
                    :key="plan.id"
                    class="plan-card"
                    :class="{ 'plan-card--highlight': plan.id === 'masterchef' }"
                >
                    <header class="plan-header">
                        <h2>{{ plan.name }}</h2>
                        <div class="price">
                            <h3>{{ plan.currency }} {{ plan.price.toFixed(2) }}</h3>
                            <p>{{ plan.period }}</p>
                        </div>
                        <p class="plan-description">{{ plan.description }}</p>
                    </header>

                    <ul class="feature-list">
                        <li v-for="feature in plan.features" :key="feature">
                            <Check class="feature-icon" />
                            <span>{{ feature }}</span>
                        </li>
                    </ul>

                    <button class="plan-button" @click="selectPlan(plan)">Change</button>
                </article>
            </div>

            <p class="cancel-subscription-text">
                <button type="button" class="cancel-subscription-button" @click="handleCancelSubscription">
                    Cancel subscription
                </button>
            </p>
        </section>
    </main>
</template>

<style scoped>
.change-plan-view {
    min-height: calc(100vh - 160px);
    padding: 42px 78px 64px;
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    box-sizing: border-box;
}

.change-plan-section {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
}

.change-plan-back {
    margin-bottom: 24px;
}

.section-header {
    max-width: 760px;
    margin-bottom: 34px;
}

.eyebrow {
    margin: 0 0 8px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 12px;
    font-weight: 800;
    color: rgba(49, 38, 110, 0.6);
}

.section-header h1 {
    margin: 0;
    font-size: 48px;
    line-height: 1.05;
    font-weight: 800;
}

.section-copy {
    margin: 12px 0 0;
    font-size: 18px;
    font-weight: 600;
    color: rgba(32, 32, 32, 0.65);
}

.plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 28px;
}

.plan-card {
    background: #fff;
    border: 1px solid #f0dcd0;
    border-radius: 32px;
    padding: 32px 34px 36px;
    box-shadow: 0 32px 70px rgba(49, 38, 110, 0.12);
    display: flex;
    flex-direction: column;
    gap: 18px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.plan-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 40px 90px rgba(49, 38, 110, 0.18);
}

.plan-card--highlight {
    border: 2px solid rgba(253, 4, 60, 0.3);
}

.plan-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.plan-header h2 {
    margin: 0;
    font-size: 30px;
    font-weight: 800;
    line-height: 1.1;
}

.price {
    display: flex;
    align-items: baseline;
    gap: 6px;
    color: #111;
}

.price h3 {
    margin: 0;
    font-size: 34px;
    font-weight: 800;
}

.price p {
    margin: 0;
    opacity: 0.5;
    font-weight: 700;
}

.plan-description {
    margin: 0;
    font-size: 16px;
    line-height: 1.55;
    font-weight: 600;
    color: rgba(33, 33, 33, 0.72);
}

.feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
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
    flex-shrink: 0;
    color: var(--accent);
    stroke-width: 2.4;
}

.plan-button {
    width: 100%;
    height: 56px;
    margin-top: auto;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.plan-button:hover {
    background: var(--button-hover-color);
    transform: translateY(-2px);
}

.cancel-subscription-text {
    margin: 28px 0 0;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
}

.cancel-subscription-button {
    border: none;
    background: transparent;
    padding: 0;
    color: var(--font-color-dark-blue);
    font: inherit;
    font-weight: 800;
    cursor: pointer;
    text-decoration: none;
}

.cancel-subscription-button:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .change-plan-view {
        padding: 30px 20px 48px;
    }

    .section-header h1 {
        font-size: 38px;
    }

    .section-copy {
        font-size: 16px;
    }

    .plan-card {
        padding: 28px 24px 30px;
    }
}
</style>
