<script setup>
    import { Star } from 'lucide-vue-next';
    import { ref } from 'vue'

    const reviewsEnabled = ref(true)
</script>

<template>
  <div class="manage-reviews">
    <div class="header">
      <div class="header-text">
        <span class="label">Enable Reviews</span>
        <p class="sub">39 Reviews</p>
      </div>
      <label class="toggle">
        <input type="checkbox" v-model="reviewsEnabled" />
        <span class="slider"></span>
      </label>
      <div class="rating-group">
        <span class="rating">4.9</span>
        <Star class="star"/>
      </div>
    </div>

    <div v-if="reviewsEnabled" class="reviews-card">
      <div class="reviews-section">
        Here reviews! 👋
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

.reviews-card {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 28px;
  padding: 40px 48px 48px;
  box-shadow: 0 28px 60px rgba(49, 38, 110, 0.12);
  display: flex;
  flex-direction: column;
  gap: 24px;

}
</style>