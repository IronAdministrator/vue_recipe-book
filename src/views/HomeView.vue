<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <div v-if="allRecipes">
      <h2>All Recipes</h2>
      <RecipeList :recipes="allRecipes" />
    </div>
    <div v-else>
      <Spinner />
    </div>
    <div class="add-btn-container">
      <router-link :to="{ name: 'AddForm' }">Add</router-link>
    </div>
  </div>
</template>

<script setup>
  // @ is an alias to /src
  // import getRecipes from "@/composables/getRecipes";
  import fetchService from "@/composables/fetchService";
  import RecipeList from "@/components/RecipeList.vue";
  import Spinner from "@/components/Spinner.vue";
  import { onMounted } from "vue";
  const { fetchedData: allRecipes, error, fetchData } = fetchService(`http://localhost:3000/recipes`);
  onMounted(() => {
    fetchData();
  });
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.home a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  background: blueviolet;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: -10px -10px 15px #ffffff, 8px 8px 25px #97a7c3;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
}
h2 {
  margin-bottom: 2rem;
  text-align: center;
}
.add-btn-container {
  padding: 0 2rem 2rem 2rem;
}
</style>
