<template>
  <!-- <div id="app">
    <img src="./assets/logo.png">
    <p>Current page: {{ $route.fullPath }}</p>
  </div>
  <nav>
    <RouterLink to="/login">Login Page</RouterLink>
    <RouterLink to="/about">About Page</RouterLink>
  </nav>
  <main>
    <router-view/>
  </main> -->
  <router-view/>
</template>

<!-- <script lang="ts">
export default {
  name: 'App'
  }
}
</script> -->

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
