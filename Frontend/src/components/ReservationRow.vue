<script setup>
import { Check, X } from 'lucide-vue-next'

const props = defineProps({
  reservation: { type: Object, required: true },
  tab: { type: String, required: true }, // 'requests' | 'accepted' | 'history'
})

function handleAccept() {
  console.log('Accept reservation', props.reservation.id)
}

function handleReject() {
  console.log('Reject reservation', props.reservation.id)
}
</script>

<template>
  <div class="reservation-row">
    <div class="user-card">
      <p class="user-name">{{ reservation.name }}</p>
      <p class="user-email">{{ reservation.email }}</p>
    </div>

    <div class="info">
      <p>Location: {{ reservation.location }}</p>
      <p>Amount People: {{ reservation.people }}</p>
    </div>

    <div class="datetime">
      <p>Date: {{ reservation.date }}</p>
      <p>Time: {{ reservation.time }}</p>
    </div>

    <div class="actions">
      <template v-if="tab !== 'history'">
        <button class="action-btn" @click="handleAccept" aria-label="Accept">
          <Check class="action-icon" />
        </button>
        <button class="action-btn" @click="handleReject" aria-label="Reject">
          <X class="action-icon" />
        </button>
      </template>
      <span v-else class="status-badge" :class="reservation.status?.toLowerCase()">
        {{ reservation.status }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.reservation-row {
  display: grid;
  grid-template-columns: 200px 1fr 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 16px 24px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 8px 30px rgba(49, 38, 110, 0.07);
}

.user-card {
  background: var(--accent);
  border-radius: 16px;
  padding: 14px 18px;
  color: white;
}

.user-name {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 800;
}

.user-email {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.9;
}

.info,
.datetime {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info p,
.datetime p {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--font-color-dark-blue);
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: none;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}

.action-btn:hover {
  background: var(--button-hover-color);
  transform: translateY(-1px);
}

.action-icon {
  width: 16px;
  height: 16px;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 999px;
  border: 2px solid var(--font-color-dark-blue);
  color: var(--font-color-dark-blue);
  font-size: 13px;
  font-weight: 700;
  background: transparent;
  white-space: nowrap;
}
</style>
