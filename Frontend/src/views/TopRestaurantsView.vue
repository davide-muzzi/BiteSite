<script setup>
import { ref, onMounted, computed } from "vue";
import { Search, Star } from "lucide-vue-next";
import { getAllRestaurants, getRestaurantsTags, getRestaurantsReviews } from "@/api/routes/restaurant.js";

const restaurants = ref([]);

onMounted(async () => {
  const result = await getAllRestaurants();
  console.log("Restaurants:", result);

  if (result.success) {
    restaurants.value = result.projects;

    for (const restaurant of restaurants.value) {

      const tagsResult = await getRestaurantsTags(restaurant.projectId);
      console.log(tagsResult);

      if (tagsResult.success) {
        restaurant.tags = tagsResult.tags;
      } else {
        restaurant.tags = [];
      }

      const reviewsResult = await getRestaurantsReviews(restaurant.projectId);

      if (reviewsResult.success) {
        restaurant.reviews = reviewsResult.reviews;
        console.log(reviewsResult);
      } else {
        restaurant.reviews = [];
      }

      let totalReviews = restaurant.reviews.length;
      let sumReviews = 0;

      for (const review of restaurant.reviews) {
        sumReviews += review.reviewRating;      }

      if (totalReviews > 0) {
        restaurant.averageRating = sumReviews / totalReviews;
      } else {
        restaurant.averageRating = 0;
      }
    }
  }
});

const searchQuery = ref("");
const sortedRestaurants = computed(() => {

  return restaurants.value
    .filter(r => r.websiteTitle.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .sort((a, b) => b.averageRating - a.averageRating)
});

function visitSite(url) {
  window.location.href = url
}
</script>

<template>
  <section class="restaurants-view">
    <div class="header">
      <div>
        <h1>Top Restaurants</h1>
        <p>Browse standout restaurant sites created by BiteSite clients and rated top-notch.</p>
      </div>
      <div class="search">
        <input type="search" v-model="searchQuery" placeholder="Search restaurants..."/>
        <button type="button" aria-label="Search">
          <Search class="search-icon" />
        </button>
      </div>
    </div>


    <div class="restaurant-list">
      <article v-for="restaurant in sortedRestaurants" :key="restaurant.id" class="restaurant-card">
         <span class="icon">{{ restaurant.icon }}</span>
        <div class="details">
          <div class="title-row">
            <h2>{{ restaurant.websiteTitle }}</h2>
             <div class="rating" :aria-label="`Rated ${restaurant.averageRating} stars`">
               {{ restaurant.averageRating ? restaurant.averageRating.toFixed(1) : "0.0" }}               <Star class="star" />
            </div>
          </div>
          <div class="tags">
            <span v-for="tag in restaurant.tags" :key="tag" class="tag">
              {{ tag.name }}
            </span>
          </div>
        </div>
         <div  class="actions">
           <div class="visit-link" @click="visitSite(restaurant.websiteRoute)">Visit Site</div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.search-icon {
  width: 18px;
  height: 18px;
}

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
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  height: 125px;
  gap: 18px;
  align-items: center;
  padding: 0 24px;
  border-radius: 28px;
  background: white;
  box-shadow: 0 24px 60px rgba(49, 38, 110, 0.08);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.visit-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--accent);
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease;
}

.visit-link:hover {
  background: var(--button-hover-color);
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

.details h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
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
