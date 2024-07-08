<template>
  <div class="hero-section">
    <div class="hero-container">
      <h1 class="hero-title">Chess Tactics, Python Logic</h1>
      <h4 class="hero-desc">Learn Python While Playing Chess</h4>
      <router-link to="/register" class="light-button">Get Started!</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5),
  rgba(0, 0, 0, 0.5)), url('@/assets/images/chess_background.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.hero-section .hero-container {
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f2f2f2;
  padding: 1rem;
  gap: 1.5rem;
}

.hero-container .hero-title {
  font-size: calc(var(--font-size) * 5);
}

.hero-container .hero-desc {
  font-size: calc(var(--font-size) * 3);
}

.hero-container .light-button {
  font-size: calc(var(--font-size) * 2);
  color: var(--primary-brand-gradient);
  box-shadow: var(--border-dark-drop-shadow);
  transition: all .2s ease-in-out;
}

.hero-container > a:hover {
  box-shadow: var( --button-light-drop-shadow-active);
}

@media only screen and (max-width: 576px) {
  .hero-container .hero-title {
    font-size: calc(var(--font-size) * 3);
  }

  .hero-container .hero-desc {
    font-size: calc(var(--font-size) * 1.5);
  }
}
</style>
