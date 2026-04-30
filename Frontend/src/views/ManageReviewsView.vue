<script setup>
    import { Star } from 'lucide-vue-next';
    import { ref, computed } from 'vue'

    const reviewsEnabled = ref(true)

    //TODO: api dings da
    const reviews = ref([
        {
            id: 1,
            username: "Julius Maximus24",
            date: "11.11.2011",
            rating: 1,
            title: "Lecker",
            text: "AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
        },
        {
            id: 2,
            username: "Janikus Minimus25",
            date: "06.07.2024",
            rating: 5,
            title: "Essen!",
            text: "Nam Nam Nam Nam Nam Nam Nam"
        },
    ])

    const reviewCount = computed(() => reviews.value.length)
    // Claude was here ↓
    const averageRating = computed(() => {
        if (reviewCount.value === 0) return 0
        const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
        return (sum / reviewCount.value).toFixed(1)
    })
    // Claude was here ↑
</script>

<template>
  <div class="manage-reviews">
    <div class="header">
      <div class="header-text">
        <span class="label">Enable Reviews</span>
        <p class="sub">{{ reviewCount }} Review{{ reviewCount !== 1 ? 's' : '' }}</p>
      </div>
      <label class="toggle">
        <input type="checkbox" v-model="reviewsEnabled" />
        <span class="slider"></span>
      </label>
      <div class="rating-group">
        <span class="rating">{{ averageRating }}</span>
        <Star class="star"/>
      </div>
    </div>

    <div v-if="reviewsEnabled" class="reviews-list">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="reviews-card"
      >
        <div class="reviews-section">
          <div class="card-header">
            <div class="user-n-date">
              <span>{{ review.username }}</span>
              <span>{{ review.date }}</span>
            </div>

            <div class="star-rating">
              <Star
                v-for="n in 5"
                :key="n"
                class="rating-star"
                :class="{ filled: n <= review.rating }"
              />
            </div>
          </div>
          <div class="line"></div>
          <div class="details">
            <h3>{{ review.title }}</h3>
            {{ review.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.manage-reviews {
  padding: 0 32px;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 32px;
  display: flex;
  justify-content: center;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;


}

.label {
  font-weight: 600;
  font-size: 40px;
  color: var(--font-color)
}

.sub {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 30px;
}

.toggle input { 
    display: none; 
}

/*Slider created with AI*/
.slider {
  position: absolute;
  inset: 0;
  background: #ccc;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.2s;
}

.slider::before {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  left: 3px;
  top: 3px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.toggle input:checked + .slider {
  background: #e53935;
}
.toggle input:checked + .slider::before {
  transform: translateX(26px);
}

.rating-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rating {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}

.star {
  fill: #ffb400;
  color: #ffb400;
}

.reviews-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.reviews-card {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
    padding: 0px 0px 48px;
    box-shadow: 0 28px 60px rgba(49, 38, 110, 0.12);
    display: flex;
    flex-direction: column;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-right: 20px;
}
.user-n-date {
    background-color: var(--accent);
    border-radius: 10px 0px 0px 0px;
    padding: 10px;
    flex: 1;
    width: 75%;
    display: flex;
    justify-content: space-between;
    color: white;
}

.star-rating {
    display: flex;
    gap: 4px;
}

.rating-star {
    width: 24px;
    height: 24px;
    fill: #ccc;
    color: #ccc;
}

.rating-star.filled {
    fill: #ffb400;
    color: #ffb400;
}

.details {
    padding: 0 20px 0 10px;
    overflow-wrap: break-word; 
    word-break: break-word;
}

.line {
    margin: -1px 0 0 auto;
    padding: 0;
    color:#888;
    width: 24.55%;
    text-decoration: none;
    border-radius: 0;
    height: 1px;
}

</style>