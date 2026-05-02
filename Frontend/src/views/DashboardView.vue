<script setup>
import { ref, onMounted } from "vue";
import {
  Globe,
  GlobeOff,
  Star,
  Pencil,
  Mail,
  User,
  Trash,
  Check,
  Save,
  Copy
} from "lucide-vue-next";
import BackButton from "@/components/BackButton.vue";
import { getAllRestaurants, getRestaurantsTags, getRestaurantsReviews } from "@/api/routes/restaurant.js";
import { editProject, getSingleProject, togglePublish, deleteProject } from "@/api/routes/project.js";
import router from "@/router";
import { useRoute } from "vue-router";

const pageRoute = useRoute();

const projectId = ref(pageRoute.params.projectId);
const published = ref(false);
const title = ref("");
const route = ref("");
const name = ref("");
const apiUrl = ref(import.meta.env.VITE_API_URL + "/restaurants/website/");

const handleTogglePublish = async () =>  {
  const result = await togglePublish(pageRoute.params.projectId);

  if (result.success) published.value = !published.value;
}

const handleEditProject = async (newTitle) => {
  if (
    !title.value.trim() ||
    !name.value.trim() ||
    !route.value.trim()
  ) return;

  const result = await editProject({
    projectId: pageRoute.params.projectId,
    route: route.value,
    name: name.value,
    title: title.value
  });
};

const handleDeleteProject = async () => {
  const result = await deleteProject(pageRoute.params.projectId)

  if (result.success) router.push("/projects-overview");
};

const rating = ref(0)

const restaurant = ref({
  reviews: [],
  averageRating: 0
})

const copyUrlToClipboard = async () => {
  await navigator.clipboard.writeText(apiUrl.value + route.value);
}


onMounted(async () => {
  const result = await getSingleProject(projectId.value);

  if (result.success) {
    name.value = result.project.name;
    title.value = result.project.websiteTitle;
    route.value = result.project.websiteRoute;
    published.value = result.project.published;
  }

  const reviewsResult = await getRestaurantsReviews(pageRoute.params.projectId);

  if (reviewsResult.success) {
    restaurant.value.reviews = reviewsResult.reviews;
  } else {
    restaurant.value.reviews = [];
  }

  let totalReviews = restaurant.value.reviews.length;
  let sumReviews = 0;

  for (const review of restaurant.value.reviews) {
    sumReviews += Number(review.reviewRating); // sicherheitshalber casten
  }

  if (totalReviews > 0) {
    restaurant.value.averageRating = sumReviews / totalReviews;
    restaurant.value.sumReviews = sumReviews;
  } else {
    restaurant.value.averageRating = 0;
    restaurant.value.sumReviews = 0;
  }

  rating.value = restaurant.value.averageRating;
});


// const handleProjectClick = async () => {
//   if (project.projectId === 0) {
//     router.push("/create-project");
//   } else {
//     router.push(`/dashboard/${pageRoute.params.projectId}};
//   }
// };
</script>

<template>
    <div class="dashboard">

        <!-- Back -->
        <BackButton />

        <div class="layout">

            <!-- LEFT -->
            <div class="left">

                <div class="field">
                    <label>Project name:</label>
                    <input placeholder="BitesFood v1" v-model="name"/>
                </div>

                <div class="field">
                    <label>Website title:</label>
                    <input placeholder="BitesFood" v-model="title"/>
                </div>

                <div class="field">
                    <div class="route-label-line">
                      <label>Route (must be unique):</label>
                      <Copy @click="copyUrlToClipboard"/>
                    </div>

                    <div class="subdomain">
                        <div class="domain">
                          {{ apiUrl }}
                        </div>
                        <input class="sub-input" placeholder="bitesfood" v-model="route"/>
                        <Check class="icon check" />
                    </div>
                </div>

                <div class="published">
                    <component :is="published ? Globe : GlobeOff" class="icon" />
                    <span class="published-text">
                        {{ published ? "Published" : "Unpublished" }}
                        <Check v-if="published" class="icon check" />
                    </span>
                </div>

                <!-- STATS -->
                <div class="stats">

                    <div class="stat-block rating">

                        <div class="stat-title">
                            Rating
                        </div>

                        <div class="rating-row">
                            <div>
                              <div v-if="restaurant.reviews.length === 1"  class="stat-label">{{ restaurant.reviews.length }} Review</div>
                                <div v-else class="stat-label">{{ restaurant.reviews.length }} Reviews</div>
                                <div class="rating-value">
                                 {{ restaurant.averageRating.toFixed(1) }}
                                    <Star class="star" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>


            <!-- RIGHT -->
            <div class="right">

                <div class="actions">

                    <button class="save" @click="handleEditProject">
                        <Save class="icon" />
                        Save
                    </button>

                    <button class="outline" @click="handleTogglePublish">
                        <component :is="published ? GlobeOff : Globe" class="icon" />
                        {{ published ? "Unpublish" : "Publish" }}
                    </button>

                    <button class="outline" @click="handleDeleteProject">
                        <Trash class="icon" />
                        Delete Project
                    </button>

                </div>

                <button class="main-btn" @click="router.push(`/editor/${projectId}`)">
                    <Pencil class="icon" />
                    Open in editor
                </button>

                <button class="main-btn" @click="router.push(`/${1}/newsletter`)">
                    <Mail class="icon" />
                    Manage Newsletter
                </button>

                <button class="main-btn" @click="router.push(`/${projectId}/reservations`)">
                    <User class="icon" />
                    Manage Reservations
                </button>

                <button class="main-btn" @click="router.push(`/manage-reviews/${pageRoute.params.projectId}`)">
                   <Star class="icon" />
                    Manage Reviews
                </button>

            </div>

        </div>
    </div>


</template>

<style scoped>
* {
  box-sizing: border-box;
}

.dashboard {
    padding: 40px 80px;
    font-family: var(--font);
}

.layout {
    display: flex;
    justify-content: space-between;
}

.left {
    width: 55%;
}

.right {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.field {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
}

input {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: none;
}

.subdomain {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
}

.sub-input {
    flex: 1;
    min-width: 0;
}

.domain {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
}

.published {
    margin: 20px 0 30px 0;
    display: flex;
    align-items: center;
    gap: 6px;
}

.stats {
    display: flex;
    gap: 80px;
}

.stat-title {
    font-weight: 600;
    margin-bottom: 10px;
}

.stat-label {
    font-size: 14px;
}

.rating-value {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 36px;
    font-weight: 600;
}

.star {
    fill: gold;
    stroke: gold;
    width: 22px;
    height: 22px;
}

.published-text {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    line-height: 1;
}

.check {
    stroke: rgb(0, 200, 0);
    display: block;
}

.actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

button {
    font-family: var(--font);
    cursor: pointer;
}

.save {
    background: var(--accent);
    color: white;
    border: none;
    padding: 8px 18px;
    border-radius: 20px;

    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
}

.outline {
    background: transparent;
    border: 2px solid var(--font-color-dark-blue);
    padding: 6px 14px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.main-btn {
    background: var(--accent);
    color: white;
    border: none;
    padding: 16px;
    border-radius: 30px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.icon {
    width: 18px;
    height: 18px;
}

.route-label-line {
  display: flex;
  justify-content: space-between;
}

.route-label-line .lucide {
  width: 20px;
  aspect-ratio: 1/1;
  cursor: pointer;
}

.route-label-line .lucide:active {
  transform: scale(0.9);
}
</style>
