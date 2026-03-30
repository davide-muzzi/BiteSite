<script setup>
const restaurants = [
  {
    id: "pizza-palace",
    icon: "🍕",
    name: "Pizza Place",
    tags: ["Italian", "Pizza"],
    rating: 5,
  },
  {
    id: "sushi-star",
    icon: "🍣",
    name: "Sushi Star",
    tags: ["Sushi", "Asian", "Fresh"],
    rating: 4,
  },
];
</script>

<template>
  <section class="restaurants-view">
    <div class="header">
      <div>
        <h1>Top Restaurants</h1>
        <p>Browse standout restaurant sites created by BiteSite clients and rated top-notch.</p>
      </div>
      <div class="search">
        <input type="search" placeholder="Search restaurants..." />
        <button type="button" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
    </div>

    <div class="restaurant-list">
      <article v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <div class="identity">
          <span class="icon">{{ restaurant.icon }}</span>
          <div class="title-block">
            <h2>{{ restaurant.name }}</h2>
            <div class="tags">
              <span v-for="tag in restaurant.tags" :key="tag" class="tag">
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
        <div class="rating">
          <span>{{ restaurant.rating.toFixed(1) }}</span>
          <span class="star">★</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.restaurants-view {
  min-height: calc(100vh - 160px);
  padding: 42px 78px 80px;
  background: var(--background);
  font-family: var(--font);
  color: var(--font-color-dark-blue);
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 36px;
}

.header h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 800;
}

.header p {
  margin: 6px 0 0;
  font-size: 18px;
  color: rgba(32, 32, 32, 0.65);
  font-weight: 600;
}

.search {
  flex-shrink: 0;
  width: 320px;
  position: relative;
}

.search input {
  width: 100%;
  height: 48px;
  border-radius: 999px;
  border: none;
  padding: 0 64px 0 24px;
  background: white;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 14px 40px rgba(49, 38, 110, 0.12);
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
}

.restaurant-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.restaurant-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-radius: 28px;
  background: white;
  box-shadow: 0 24px 60px rgba(49, 38, 110, 0.08);
  transition: background 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
}

.identity {
  display: flex;
  gap: 20px;
  align-items: center;
}

.icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: rgba(229, 0, 43, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.title-block h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.tag {
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--font-color-dark-blue);
  color: white;
  font-size: 13px;
  font-weight: 700;
}

.rating {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 800;
  color: var(--font-color-dark-blue);
}

.rating span:first-child {
  min-width: 36px;
  text-align: right;
}

.star {
  color: #ffb400;
  font-size: 26px;
}
</style>
