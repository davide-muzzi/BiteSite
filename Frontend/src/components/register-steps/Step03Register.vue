<script setup>

</script>

<template>
    <div class="🦅">
        <div class="paymentinfo-card">
            <h2>Payment Information</h2>
            <form class="register-form" >
                <div class="form-group">
                    <input
                        id="cardnumber"
                        type="text"
                        v-model="cardnumber"
                        placeholder="Cardnumber"
                        required
                    />
                </div>
                <div class="form-group">
                        <input
                            id="cardholdername"
                            type="cardholdername"
                            v-model="cardholdername"
                            placeholder="Cardholder Name"
                            required
                        />
                </div>
                
                <div class="next-to">
                    <div class="form-group-half">
                        <input
                            id="mmyy"
                            type="mmyy"
                            v-model="mmyy"
                            placeholder="MM/YY"
                            required
                        />
                    </div>

                    <div class="form-group-half">
                        <input
                            id="cvv"
                            type="cvv"
                            v-model="cvv"
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>

                <button type="submit" class="payment-button">
                    Pay
                </button>
            </form>


        </div>

        <div class="overview-card">
            <h2>Overview</h2>
            Show selected subscription and contents

            <h2>Total</h2>
            Show total price
        </div>
    </div>
</template>

<style scoped>
body {
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
}

.🦅 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.paymentinfo-card {
    background-color: #ffeede;
    width: 510px; 
    height: 460px; 
    border-radius: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form-group input {
    width: 445px;
    height: 63px;
    border-radius: 46px;
    border: none;
    font-size: 22px;
    font-family: var(--font);
    margin-top: 12px;
    box-sizing: border-box;
    text-align: center;
}

.next-to {
    display: flex;
    align-items: baseline;
    gap: 6px;
}

.form-group-half input {
    width: 217px;
    height: 63px;
    border-radius: 46px;
    border: none;
    font-size: 22px;
    font-family: var(--font);
    margin-top: 12px;
    box-sizing: border-box;
    text-align: center;
}

.payment-button {
    width: 445px;
    height: 63px;
    border-radius: 46px;
    border: none;
    margin-top: 45px;
    background-color: var(--accent);
    color: white;
    font-size: 22px;
    cursor: pointer;
    font-weight: 600;
    box-sizing: border-box;
}

.payment-button:hover {
    background-color: var(--button-hover-color);
}

.overview-card {
    background-color: #ffeede;
    width: 422px; 
    height: 460px; 
    border-radius: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
}
</style>