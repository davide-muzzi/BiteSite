<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Star } from 'lucide-vue-next'

const route = useRoute()

const reviewName = ref('')
const reviewTitle = ref('')
const reviewMessage = ref('')
const reviewRating = ref(0)
const hoveredRating = ref(0)
const submitted = ref(false)
const errorMessage = ref('')

// Star made with AI
const setRating = (n) => { reviewRating.value = n }
const setHover = (n) => { hoveredRating.value = n }
const clearHover = () => { hoveredRating.value = 0 }

const handleSubmit = () => {
    if (reviewRating.value === 0) {
        errorMessage.value = 'Please select a star rating.'
        return
    }
    errorMessage.value = ''
    // TODO: connect to backendz 
    submitted.value = true
}
</script>

<template>
    <section class="review-page">
        <div class="page-header">
            <h1>Write a Review</h1>
        </div>

        <div v-if="!submitted" class="write-review-card">
            <form class="review-form" @submit.prevent="handleSubmit">

                <div class="form-group">
                    <label>Rating</label>
                    <div class="star-picker"
                        @mouseleave="clearHover"
                    >
                        <Star
                            v-for="n in 5"
                            :key="n"
                            class="star-icon"
                            :class="{ active: n <= (hoveredRating || reviewRating) }"
                            @mouseenter="setHover(n)"
                            @click="setRating(n)"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="reviewName" required>
                </div>

                <div class="form-group">
                    <label for="title">Title</label>
                    <input id="title" type="text" v-model="reviewTitle" placeholder="" required />
                </div>

                <div class="form-group">
                    <label for="message">Your Review</label>
                    <textarea id="message" v-model="reviewMessage" placeholder="Describe..." rows="5" required></textarea>
                </div>

                <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>

                <button type="submit" class="submit-button">Submit Review</button>
            </form>
        </div>

        <div v-else class="write-review-card success-card">
            <h2>Thank you!</h2>
            <p>Your review has been submitted.</p>
        </div>
    </section>
</template>

<style scoped>
.review-page {
    min-height: calc(100vh - 160px);
    padding: 42px 78px 80px;
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    box-sizing: border-box;
}

.page-header {
    margin: 32px auto;
    max-width: 520px;
    text-align: center;
}

.page-header h1 {
    margin: 0 0 6px;
    font-size: 48px;
    font-weight: 800;
}

.write-review-card {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    background: white;
    border-radius: 28px;
    padding: 40px 48px 48px;
    box-shadow: 0 28px 60px rgba(49, 38, 110, 0.12);
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.review-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-group label {
    display: block;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
}

.form-group input {
    width: 100%;
    height: 64px;
    border-radius: 999px;
    border: none;
    background: #f9f6f1;
    padding: 0 28px;
    font-family: var(--font);
    font-size: 18px;
    font-weight: 600;
    color: #2b2b2b;
    box-sizing: border-box;
}

.form-group textarea {
    width: 100%;
    border-radius: 20px;
    border: none;
    background: #f9f6f1;
    padding: 18px 28px;
    font-family: var(--font);
    font-size: 16px;
    font-weight: 600;
    color: #2b2b2b;
    box-sizing: border-box;
    resize: vertical;
}

.star-picker {
    display: flex;
    gap: 8px;
}

.star-icon {
    width: 36px;
    height: 36px;
    fill: #ccc;
    color: #ccc;
    cursor: pointer;
    transition: fill 0.15s, color 0.15s;
}

.star-icon.active {
    fill: #ffb400;
    color: #ffb400;
}


.submit-button {
    width: 100%;
    height: 64px;
    border-radius: 999px;
    border: none;
    background-color: var(--accent);
    color: white;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.submit-button:hover {
    background-color: var(--button-hover-color);
    transform: translateY(-2px);
}

.error-message {
    color: red;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
}

.success-card {
    align-items: center;
    text-align: center;
    gap: 12px;
}

.success-card h2 {
    margin: 0;
    font-size: 32px;
    font-weight: 800;
}

.success-card p {
    margin: 0;
    font-size: 18px;
    color: rgba(32, 32, 32, 0.65);
    font-weight: 600;
}
</style>
