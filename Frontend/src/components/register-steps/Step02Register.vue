<template>
    <div class="beginner-card">
        <h2>BiteSite Beginner</h2>
        <div class="price">
            <h3>CHF 14.95</h3> <p>/Month</p>
        </div>
        <button button="select">Select</button>

        <div class="beginner-text">
            <p>✓ One Website</p>
            <p>✓ Direct Hosting</p>
            <p>✓ Restaurant specific SEO</p>
            <p>✓ Reservation possible</p>
            <p>✓ Limited Templates</p>
        </div>
    </div>

    <div class="masterchef-card">
        <h2>BiteSite MasterChef</h2>
        <div class="price">
            <h3>CHF 49.95</h3> <p>/Month</p>
        </div>
        <button button="select">Select</button>

        <div class="masterchef-text">
            <p>✓ Unlimited Websites</p>
            <p>✓ Direct Hosting</p>
            <p>✓ Restaurant specific SEO</p>
            <p>✓ Reservation possible</p>
            <p>✓ All Templates</p>
            <p>✓ Consulting</p>
            <p>✓ Newsletter automation</p>
        </div>
    </div>

</template>

<style scoped>
body {
    background: var(--background);
    font-family: var(--font);
    color: var(--font-color-dark-blue);
}

.beginner-card {
    background-color: #ffeede;
    width: 607px; 
    height: 341px; 
    border-radius: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.price {
    display: flex;
    align-items: baseline;
    gap: 6px;
    color: black;
}

.price h3 {
    margin: 0;
}

.price p {
    margin: 0;
    opacity: 0.4;
}

.beginner-card button {
  width: 445px;
  height: 46px;
  border-radius: 46px;
  border: none;
  margin-top: 10px;
  background-color: var(--accent);
  color: white;
  font-size: 22px;
  cursor: pointer;
  font-weight: 600;
  box-sizing: border-box;
}

.beginner-card button:hover {
  background-color: var(--button-hover-color);
}

.beginner-card .beginner-text {
    color: #000000;
    font-weight: 600;
}



.masterchef-card {
    background-color: #ffeede;
    width: 607px; 
    height: 485px; 
    border-radius: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 74px;
    margin-bottom: 70px;
}

.masterchef-card button {
  width: 445px;
  height: 46px;
  border-radius: 46px;
  border: none;
  margin-top: 10px;
  background-color: var(--accent);
  color: white;
  font-size: 22px;
  cursor: pointer;
  font-weight: 600;
  box-sizing: border-box;
}

.masterchef-card button:hover {
  background-color: var(--button-hover-color);
}

.masterchef-card .masterchef-text {
    color: #000000;
    font-weight: 600;
}

</style>
