<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const total = props.totalPages
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  let start = props.currentPage - 2
  if (start < 1) start = 1
  if (start + 4 > total) start = total - 4
  return Array.from({ length: 5 }, (_, i) => start + i)
})

function goTo(page) {
  if (page < 1 || page > props.totalPages) return
  emit('page-change', page)
}
</script>

<template>
  <div class="pagination">
    <button class="arrow-btn" :disabled="currentPage === 1" @click="goTo(currentPage - 1)" aria-label="Previous page">
      <ChevronLeft class="arrow-icon" />
    </button>

    <button v-for="(page, index) in visiblePages" :key="index" class="page-btn"
      :class="{ active: page === currentPage }" @click="goTo(page)" :aria-label="`Page ${page}`"
      :aria-current="page === currentPage ? 'page' : undefined">
      {{ page }}
    </button>

    <button class="arrow-btn" :disabled="currentPage === totalPages" @click="goTo(currentPage + 1)"
      aria-label="Next page">
      <ChevronRight class="arrow-icon" />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 36px;
}

.page-btn,
.arrow-btn {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 2px solid var(--font-color-dark-blue);
  background: transparent;
  color: var(--font-color-dark-blue);
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.page-btn:hover:not(.active),
.arrow-btn:hover:not(:disabled) {
  background: rgba(49, 38, 110, 0.08);
  transform: translateY(-1px);
}

.page-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.arrow-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.arrow-icon {
  width: 18px;
  height: 18px;
}
</style>
