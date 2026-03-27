<script setup>
import { computed, ref } from 'vue';
import BackButton from '@/components/BackButton.vue';
import { sendNewsletter } from '@/api/routes/restaurant.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const subject = ref('');
const body = ref('');
const subscribers = ref(617);
const uploads = ref([]);

let nextUploadId = 1;
const statusMessage = ref('');
const sending = ref(false);
const sendSuccess = ref(false);

const formattedSubscribers = computed(() =>
    subscribers.value.toLocaleString('en-US'),
);

const isSendDisabled = computed(
    () =>
        !subject.value.trim() ||
        !body.value.trim() ||
        sending.value ||
        sendSuccess.value,
);

const sendButtonLabel = computed(() => {
    if (sendSuccess.value) return 'Sucessfully sent';
    return sending.value ? 'Sending...' : 'Send';
});

function handleUpload(event) {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (!files.length) return;

    files.forEach((file) => {
        const preview = URL.createObjectURL(file);
        uploads.value.push({
            id: nextUploadId++,
            name: file.name,
            preview,
            file,
        });
    });

    event.target.value = '';
}

function removeUpload(id) {
    const upload = uploads.value.find((item) => item.id === id);
    if (!upload) return;

    uploads.value = uploads.value.filter((item) => item.id !== id);
}

async function handleSendNewsletter() {
    if (isSendDisabled.value) return;
    sending.value = true;
    sendSuccess.value = false;
    statusMessage.value = '';

    try {
        const attachments = uploads.value.map((upload) => upload.file);
        const result = await sendNewsletter(
            route.params.id,
            subject.value,
            body.value,
            attachments,
        );

        if (result?.success) {
            sendSuccess.value = true;
            sending.value = false;
            statusMessage.value = 'Newsletter sent! Redirecting...';
            setTimeout(() => { router.push('/dashboard'); }, 3000);
            return;
        }

        statusMessage.value = result?.message || 'Unable to send the newsletter.';
    } catch (error) {
        console.error('Failed to send newsletter', error);
        statusMessage.value = 'Unable to send the newsletter.';
    } finally {
        if (!sendSuccess.value) {
            sending.value = false;
        }
    }
}
</script>

<template>
    <section class="newsletter-view">
        <BackButton class="newsletter-back" />

        <div class="newsletter-grid">
            <div class="hero">
                <h1>Newsletter</h1>
                <p>Craft the next update for your BiteSite community.</p>
            </div>

            <div class="stat-card">
                <span>Subscribers</span>
                <strong>{{ formattedSubscribers }}</strong>
            </div>

            <div class="editor-card">
                <label class="field-label" for="newsletter-subject">Subject</label>
                <input id="newsletter-subject" v-model="subject" type="text"
                    placeholder="Write an irresistible subject line" />

                <label class="field-label" for="newsletter-body">Text</label>
                <textarea id="newsletter-body" v-model="body"
                    placeholder="Share curated menus, events, or limited offers..." rows="8"></textarea>

                <button class="send-btn" type="button" :disabled="isSendDisabled" @click="handleSendNewsletter">
                    {{ sendButtonLabel }}
                </button>
                <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>
            </div>

            <aside class="sidebar">
                <div class="upload-card">
                    <header>
                        <p>Assets</p>
                        <span>{{ uploads.length }} files</span>
                    </header>
                    <label class="upload-box">
                        <input type="file" accept="image/*" multiple @change="handleUpload" />
                        <span>Upload Files</span>
                    </label>
                    <div class="upload-grid">
                        <div v-for="upload in uploads" :key="upload.id" class="upload-item">
                            <img :src="upload.preview" :alt="upload.name" />
                            <button class="upload-remove" type="button" aria-label="Remove file"
                                @click="removeUpload(upload.id)">
                                &times;
                            </button>
                            <p class="upload-name">{{ upload.name }}</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </section>
</template>

<style scoped>
.newsletter-view {
    min-height: calc(100vh - 160px);
    padding: 42px 78px 80px;
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
    box-sizing: border-box;
}

.newsletter-back {
    margin-bottom: 24px;
}

.newsletter-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
    gap: 32px;
    align-items: flex-start;
}

.hero h1 {
    margin: 0 0 6px;
    font-size: 48px;
    font-weight: 800;
}

.hero p {
    margin: 0;
    font-size: 18px;
    color: rgba(32, 32, 32, 0.65);
    font-weight: 600;
}

.hero {
    grid-column: 1 / 2;
}

.stat-card {
    min-width: 210px;
    width: 100%;
    justify-self: stretch;
    grid-column: 2 / 3;
    border-radius: 18px;
    background: white;
    padding: 22px 28px;
    text-align: right;
    box-shadow: 0 20px 50px rgba(49, 38, 110, 0.12);
    box-sizing: border-box;
}

.stat-card span {
    display: block;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 4px;
}

.stat-card strong {
    font-size: 42px;
    font-weight: 800;
    color: var(--accent);
}

.editor-card,
.upload-card {
    background: white;
    border-radius: 32px;
    padding: 36px 40px;
    box-shadow: 0 28px 60px rgba(49, 38, 110, 0.12);
    display: flex;
    flex-direction: column;
}

.editor-card {
    gap: 18px;
    grid-column: 1 / 2;
}

.field-label {
    font-size: 18px;
    font-weight: 700;
}

.editor-card input,
.editor-card textarea {
    width: 100%;
    border: none;
    border-radius: 28px;
    background: #f9f6f1;
    padding: 18px 26px;
    font-size: 18px;
    font-family: var(--font);
    font-weight: 600;
    color: #2b2b2b;
    resize: none;
    box-sizing: border-box;
}

.editor-card textarea {
    min-height: 280px;
    border-radius: 32px;
}

.send-btn {
    margin-top: 12px;
    height: 66px;
    border-radius: 999px;
    background: var(--accent);
    color: white;
    font-size: 20px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.send-btn:not(:disabled):hover {
    background: var(--button-hover-color);
    transform: translateY(-2px);
}

.status-message {
    margin: 6px 0 0;
    font-size: 15px;
    font-weight: 600;
    color: rgba(49, 38, 110, 0.8);
}

.sidebar {
    display: flex;
    flex-direction: column;
    grid-column: 2 / 3;
}

.upload-card header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
}

.upload-box {
    border: 2px dashed rgba(49, 38, 110, 0.25);
    border-radius: 24px;
    padding: 24px;
    text-align: center;
    font-weight: 700;
    color: var(--font-color-dark-blue);
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.upload-box:hover {
    border-color: var(--accent);
    color: var(--accent);
}

.upload-box input {
    display: none;
}

.upload-grid {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
}

.upload-item {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    background: #000;
    box-shadow: 0 18px 40px rgba(49, 38, 110, 0.18);
}

.upload-item img {
    display: block;
    width: 100%;
    height: 120px;
    object-fit: cover;
}

.upload-remove {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: var(--accent);
    color: white;
    font-size: 20px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.upload-name {
    margin: 0;
    padding: 10px 14px 14px;
    font-size: 13px;
    font-weight: 600;
    color: var(--font-color-dark-blue);
    background: white;
}
</style>
