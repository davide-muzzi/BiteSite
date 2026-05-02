<script setup>
import { Mail, Phone, MapPin } from "lucide-vue-next";
</script>

<template>
    <div class="contact-page">

        <section class="page-header">
            <p class="eyebrow">Get in touch</p>
            <h1>Contact Us</h1>
            <p class="lead">Have a question or need help? We're here for you.</p>
        </section>

        <section class="section">
            <div class="cards">

                <div class="contact-card">
                    <div class="icon-wrap">
                        <MapPin :size="22" />
                    </div>
                    <h3>Address</h3>
                    <p>BiteSite</p>
                    <p>Fiktivestrasse 5</p>
                    <p>6000 Luzern</p>
                </div>

                <div class="contact-card">
                    <div class="icon-wrap">
                        <Mail :size="22" />
                    </div>
                    <h3>Email</h3>
                    <p>bitesite@email.com</p>
                </div>

                <div class="contact-card">
                    <div class="icon-wrap">
                        <Phone :size="22" />
                    </div>
                    <h3>Phone</h3>
                    <p>+41 79 123 45 67</p>
                </div>

            </div>
        </section>

    </div>
</template>

<style scoped>
.contact-page {
    font-family: var(--font);
}

.page-header {
    background: var(--background);
    text-align: center;
    padding: 80px 80px 72px;
}

.page-header h1 {
    font-size: clamp(36px, 4vw, 60px);
    font-weight: 800;
    color: var(--font-color-dark-blue);
    margin: 0 0 20px;
}

.eyebrow {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 16px;
}

.lead {
    font-size: 18px;
    color: #6b6b8a;
    margin: 0;
    line-height: 1.65;
}

.section {
    background: white;
    padding: 80px;
}

.cards {
    display: flex;
    gap: 24px;
    max-width: 900px;
    margin: 0 auto;
}

.contact-card {
    flex: 1;
    background: var(--background);
    border-radius: 16px;
    padding: 36px 28px;
}

.icon-wrap {
    color: var(--accent);
    margin-bottom: 16px;
}

.contact-card h3 {
    font-size: 17px;
    font-weight: 700;
    color: var(--font-color-dark-blue);
    margin: 0 0 12px;
}

.contact-card p {
    font-size: 15px;
    color: #6b6b8a;
    margin: 0;
    line-height: 1.7;
}
</style>
