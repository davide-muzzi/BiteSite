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
  <section class="register-view">
    <div class="register-shell">
      <BackButton class="register-back" />

      <header class="register-lead">
        <p class="eyebrow">Step {{ currentStep }} of 3</p>
        <h1>Set up your BiteSite workspace</h1>
      </header>

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
              :style="{ left: positions[index] + '%' }"
            >
              <div
                class="point"
                :class="{
                  done: currentStep > index + 1,
                  active: currentStep === index + 1,
                }"
              ></div>

              <div class="label" :class="{ activeLabel: currentStep === index + 1 }">
                {{ s.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="register-content">
        <router-view />
      </div>
    </div>
  </section>
</template>

<style>
body {
  background: var(--background);
  font-family: var(--font);
  color: var(--font-color-dark-blue);
}

.register-view {
  min-height: calc(100vh - 160px);
  background: var(--background);
  padding: 40px 28px 120px;
  box-sizing: border-box;
  margin-bottom: 40px;
}

.register-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.register-back {
  margin-bottom: 6px;
}

.register-lead {
  max-width: 620px;
}

.register-lead h1 {
  margin: 6px 0;
  font-size: 44px;
  font-weight: 800;
}

.register-lead p {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: rgba(21, 21, 21, 0.7);
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 13px;
  font-weight: 700;
  color: rgba(49, 38, 110, 0.75);
}

.progress-bar {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.stepper {
  width: 100%;
  max-width: 900px;
  margin-bottom: 10px;
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

.register-content {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: 768px) {
  .register-lead h1 {
    font-size: 34px;
  }

  .stepper {
    max-width: none;
  }
}
</style>
