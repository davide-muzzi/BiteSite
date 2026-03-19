<script setup>
// Progressbar 80% ChatGPT
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();

const currentStep = computed(() => {
  if (route.name === "register-step1") return 1;
  if (route.name === "register-step2") return 2;
  if (route.name === "register-step3") return 3;
  return 1;
});

const positions = [0, 50, 100];

const fillWidth = computed(() => {
  return `${positions[currentStep.value - 1]}%`;
});

const steps = [
  { label: "Register" },
  { label: "Subscription" },
  { label: "Payment" },
];

</script>

<template>

    <BackButton />

    <div class="progress-bar">
        <!-- Progressbar 80% ChatGPT -->
        <div class="stepper">
          <div class="line">
            <div class="line-fill" :style="{ width: fillWidth }"></div>
          </div>

          <div class="points">
            <div
              v-for="(s, index) in steps"
              :key="index"
              class="point-wrap"
              :style="{ left: positions[index] + '%' }">

              <div
                class="point"
                :class="{
                done: currentStep > index + 1,
                active: currentStep === index + 1,
                }">
              </div>

              <div class="label" :class="{ activeLabel: currentStep === index + 1 }">
                {{ s.label }}
              </div>
            </div>
          </div>
        </div>
    </div>

    <div class="account-page">

        <router-view />
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
    flex-direction: column;
}

.progress-bar {
    margin-top: 118px;
    display: flex;
    justify-content: center;
}

.stepper {
    width: 80%;
    max-width: 900px;
    margin-bottom: 30px;

}

.line {
    height: 6px;
    background: #e7dcd6;
    border-radius: 999px;
    position: relative;
    overflow: hidden;
}

.line-fill {
    height: 100%;
    background: #e5002b;
    width: 0%;
    border-radius: 999px;
    transition: width 0.35s ease;
}

.points {
    position: relative;
    height: 55px;
    margin-top: -12px;
}

.point-wrap {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    text-align: center;
    width: 120px;
}

.point {
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: #e7dcd6;
    border: 3px solid #e7dcd6;
    margin: 0 auto;
    transition: transform 0.2s ease, background 0.2s ease, border 0.2s ease;
}

.point.active {
    background: #e5002b;
    border-color: #e5002b;
    transform: scale(1.4);
}

.point.done {
    background: #e5002b;
    border-color: #e5002b;
}

.label {
    margin-top: 10px;
    font-size: 12px;
    color: #7b6f6a;
    font-weight: 600;
}

.activeLabel {
    color: #2b2b2b;
}
</style>
