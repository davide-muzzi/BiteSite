<script setup>
const restaurants = {
  pizza_palace: {
    logo: '🍕',
    name: 'Pizza Place',
    tags: ['Italian', 'Pizza'],
    rating: 5,
  },
  sushi_star: {
    logo: '🍣',
    name: 'Sushi Star',
    tags: ['Sushi', 'Asian', 'Fresh'],
    rating: 4,
  },
}
</script>

<template>
    <div class="top">
        <h1>Top Restaurants</h1>
        <div class="search-container">
            <input type="text" placeholder="Search ..." class="search-input" />
            <button class="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </button>
        </div>
    </div>

  <div class="content">
    <div class="restaurant-box" v-for="restaurant in restaurants" :key="restaurant.name" v-order>
      <div class="restaurant-logo">
        <div>{{ restaurant.logo }}</div>
      </div>

      <div class="name">
        <span class="restaurant-name">{{ restaurant.name }}</span>
      </div>

      <div class="restaurant-tags">
        <div class="tags-container">
          <span v-for="tag in restaurant.tags" :key="tag" class="tag"> #{{ tag }} </span>
        </div>
        <div class="restaurant-rating">
          <span class="rating-value">{{ restaurant.rating }}</span>
          <div>⭐</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 200px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff5ee;
    padding: 20px;
    font-family: 'Arial', sans-serif;
}

.restaurant-box {
    display: flex;
    min-width: 900px;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    height: 80px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    max-width: 800px;
}

.restaurant-logo {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}
.logo-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.name {
    background-color: var(--accent);
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 40px 0 20px;
    margin-left: -20px;
    transform: skewX(-15deg);
    flex-grow: 0.3;
}

.restaurant-name {
    transform: skewX(15deg);
    font-weight: bold;
    font-size: 1.2rem;
    white-space: nowrap;
}

.restaurant-tags {
    background-color: var(--background);
    height: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-left: -15px;
}

.tags-container {
    display: flex;
    gap: 8px;
}

.tag {
    background-color: var(--font-color-dark-blue);
    color: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 500;
}

.restaurant-rating {
    background-color: white;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-right: -20px;
    transform: skewX(-15deg);
    margin-left: 20px;
}

.rating-value {
    transform: skewX(15deg);
    font-weight: bold;
    color: var(--font-color-dark-blue);
    margin-right: 5px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
}

.search-input {
  width: 100%;
  padding: 12px 60px 12px 25px; 
  border-radius: 50px; 
  border: none;
  background-color: white;
  font-size: 1rem;
  outline: none;

}

.search-button {
  color: white;
    position: absolute;
    right: 5px; 
    background-color: var(--accent); 
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s;
}

</style>
