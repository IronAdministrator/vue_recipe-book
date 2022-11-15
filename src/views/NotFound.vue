<template>
  <div class="not-found-container">
    <h2>404</h2> |
    <h3>Ups... Page Not Found</h3>
  </div>
  <router-link :to="{name: 'home'}">Go back to HomePage</router-link>
</template>

<script setup>

</script>

<style scoped>
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  a {
    text-decoration: none;
  }
</style>