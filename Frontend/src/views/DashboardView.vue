<script setup>
import { ref } from "vue";
import {
    Globe,
    GlobeOff,
    Star,
    Pencil,
    Mail,
    User,
    Trash,
    Check,
    Save
} from "lucide-vue-next";
import BackButton from "@/components/common/BackButton.vue";

const isPublished = ref(true);

function togglePublish() {
    isPublished.value = !isPublished.value;
}
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
                    <input placeholder="BitesFood v1" />
                </div>

                <div class="field">
                    <label>Website title:</label>
                    <input placeholder="BitesFood" />
                </div>

                <div class="field">
                    <label>Route (must be unique):</label>

                    <div class="subdomain">
                        <div class="domain">
                            bitesite.com/
                        </div>
                        <input class="sub-input" placeholder="bitesfood" />
                        <Check class="icon check" />
                    </div>
                </div>

                <div class="published">
                    <component :is="isPublished ? Globe : GlobeOff" class="icon" />
                    <span class="published-text">
                        {{ isPublished ? "Published" : "Unpublished" }}
                        <Check v-if="isPublished" class="icon check" />
                    </span>
                </div>

                <!-- STATS -->
                <div class="stats">

                    <div class="stat-block">

                        <div class="stat-title">
                            Unique visitors
                        </div>

                        <div class="stat-grid">

                            <div>
                                <div class="stat-label">Last 24 hours</div>
                                <div class="stat-number">393</div>
                            </div>

                            <div>
                                <div class="stat-label">Last 30 days</div>
                                <div class="stat-number">2'561</div>
                            </div>

                        </div>

                    </div>

                    <div class="stat-block rating">

                        <div class="stat-title">
                            Rating
                        </div>

                        <div class="rating-row">
                            <div>
                                <div class="stat-label">39 Reviews</div>
                                <div class="rating-value">
                                    4.9
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

                    <button class="save">
                        <Save class="icon" />
                        Save
                    </button>

                    <button class="outline" @click="togglePublish">
                        <component :is="isPublished ? GlobeOff : Globe" class="icon" />
                        {{ isPublished ? "Unpublish" : "Publish" }}
                    </button>

                    <button class="outline">
                        <Trash class="icon" />
                        Delete Project
                    </button>

                </div>

                <div class="preview">
                    <img src="https://placehold.co/600x350" />
                </div>

                <button class="main-btn">
                    <Pencil class="icon" />
                    Open in editor
                </button>

                <button class="main-btn">
                    <Mail class="icon" />
                    Manage Newsletter
                </button>

                <button class="main-btn">
                    <User class="icon" />
                    Manage Reservations
                </button>

                <button class="main-btn">
                    <Star class="icon" />
                    Manage Reviews
                </button>

            </div>

        </div>

    </div>
</template>

<style scoped>
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

.stat-grid {
    display: flex;
    gap: 60px;
}

.stat-label {
    font-size: 14px;
}

.stat-number {
    font-size: 36px;
    font-weight: 600;
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

.preview img {
    width: 100%;
    border-radius: 18px;
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
</style>
