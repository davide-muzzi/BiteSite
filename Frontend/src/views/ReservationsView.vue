<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search, TriangleAlert, X } from 'lucide-vue-next'
import BackButton from '@/components/BackButton.vue'
import ReservationRow from '@/components/ReservationRow.vue'
import ReservationPagination from '@/components/ReservationPagination.vue'
import { getReservations, acceptReservation } from '@/api/routes/restaurant.js'

const route = useRoute()
const activeTab = ref('requests')
const searchQuery = ref('')
const currentPage = ref(1)
const warningDismissed = ref(false)
const reservations = ref([])

const ITEMS_PER_PAGE = 7

const tabs = [
  { key: 'requests', label: 'Reservation Requests' },
  { key: 'accepted', label: 'Accepted Requests' },
  { key: 'history', label: 'Reservation History' },
]

const filteredByTab = computed(() => {
  if (activeTab.value === 'requests') return reservations.value.filter(r => r.status === 'open')
  if (activeTab.value === 'accepted') return reservations.value.filter(r => r.status === 'accepted')
  return reservations.value.filter(r => r.status !== 'open')
})

const filteredData = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return filteredByTab.value
  return filteredByTab.value.filter(r =>
    r.name.toLowerCase().includes(query) || r.email.toLowerCase().includes(query)
  )
})

const currentData = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredData.value.slice(start, start + ITEMS_PER_PAGE)
})

const activeTabIndex = computed(() => tabs.findIndex(t => t.key === activeTab.value))

const totalPages = computed(() => Math.max(1, Math.ceil(filteredData.value.length / ITEMS_PER_PAGE)))

onMounted(async () => {
  const response = await getReservations(route.params.id)
  if (response.success) reservations.value = response.reservations
})

function setTab(tab) {
  activeTab.value = tab
  currentPage.value = 1
}

function handlePageChange(page) {
  currentPage.value = page
}

async function handleAccept(reservationId) {
  const response = await acceptReservation(reservationId)
  if (!response.success) return
  const reservation = reservations.value.find(r => r.reservationId === reservationId)
  if (reservation) reservation.status = 'accepted'
}
</script>

<template>
  <section class="reservations-view">
    <div class="top-bar">
      <BackButton />
      <div class="search">
        <input v-model="searchQuery" type="search" placeholder="Search ..." />
        <button type="button" aria-label="Search">
          <Search class="search-icon" />
        </button>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="tab-bar">
        <div class="tab-slider" :style="{ transform: `translateX(${activeTabIndex * 100}%)` }"></div>
        <button v-for="tab in tabs" :key="tab.key" class="tab-btn" :class="{ active: activeTab === tab.key }"
          @click="setTab(tab.key)">
          {{ tab.label }}
        </button>
      </div>

      <div v-if="activeTab === 'history' && !warningDismissed" class="warning-banner">
        <TriangleAlert class="warning-icon" />
        <p>Entries will be automatically deleted if older than 14 days or list exceeds 100 entries</p>
        <button class="warning-dismiss" @click="warningDismissed = true" aria-label="Dismiss">
          <X class="warning-dismiss-icon" />
        </button>
      </div>

      <div class="list">
        <ReservationRow v-for="reservation in currentData" :key="reservation.reservationId" :reservation="reservation"
          :tab="activeTab" @accept="handleAccept" />
      </div>

      <ReservationPagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
    </div>
  </section>
</template>

<style scoped>
.reservations-view {
  min-height: calc(100vh - 160px);
  padding: 42px 78px 80px;
  background: var(--background);
  font-family: var(--font);
  color: var(--font-color-dark-blue);
  box-sizing: border-box;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
}

.search {
  flex-shrink: 0;
  width: 280px;
  position: relative;
}

.search input {
  width: 100%;
  height: 48px;
  border-radius: 999px;
  border: none;
  padding: 0 60px 0 24px;
  background: white;
  font-size: 15px;
  font-weight: 600;
  font-family: var(--font);
  box-shadow: 0 14px 40px rgba(49, 38, 110, 0.12);
  box-sizing: border-box;
  color: var(--font-color-dark-blue);
}

.search input::placeholder {
  color: rgba(49, 38, 110, 0.4);
}

.search button {
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search button:hover {
  background: var(--button-hover-color);
}

.search-icon {
  width: 16px;
  height: 16px;
}

.content-wrapper {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 12px;
}

.tab-bar {
  position: relative;
  display: flex;
  background: rgba(49, 38, 110, 0.07);
  border-radius: 999px;
  padding: 6px;
  margin-bottom: 28px;
}

.tab-slider {
  position: absolute;
  top: 6px;
  left: 6px;
  width: calc((100% - 12px) / 3);
  height: calc(100% - 12px);
  border-radius: 999px;
  background: var(--accent);
  transition: transform 0.25s ease;
  pointer-events: none;
}

.tab-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 999px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font);
  color: var(--font-color-dark-blue);
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.tab-btn.active {
  color: white;
}

.warning-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px 20px;
  border-radius: 16px;
  border: 2px solid var(--accent);
  background: white;
}

.warning-icon {
  width: 20px;
  height: 20px;
  color: var(--accent);
  flex-shrink: 0;
}

.warning-banner p {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  flex: 1;
}

.warning-dismiss {
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: var(--accent);
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.warning-dismiss:hover {
  opacity: 1;
}

.warning-dismiss-icon {
  width: 16px;
  height: 16px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
