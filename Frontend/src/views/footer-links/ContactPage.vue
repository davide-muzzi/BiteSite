<template>
    <div class="contact">
        <h3>You can contact us at:</h3>
        <div class="mail">
            <p>Mail:</p>
            <p>BiteSite</p>
            <p>Fiktivestrasse 5</p>
            <p>6000 Luzern</p>
        </div>
        <div class="email">
            <p>Email:</p>
            <p>bitesite@email.com</p>
        </div>
        <div class="phone">
            <p>Phone:</p>
            <p>+41 79 123 45 67</p>
        </div>
    </div>
</template>

<style scoped>
.contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-weight: 600;
    margin-left: 300px;
    margin-right: 300px;
}

.mail,
.email,
.phone {
    margin-bottom: 30px;
}

.mail p,
.email p,
.phone p {
    margin: 0;
}
</style>