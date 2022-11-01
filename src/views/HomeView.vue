<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <div v-if="recipes.length">
      <h2>All Recipes</h2>
      <RecipeList :recipes="recipes" /> <!-- passing recipes as props to RecipeList Component -->
    </div>
    <div v-else>
      <Spinner />
    </div>
    <router-link :to="{name: 'AddRecipe'}">Add</router-link>
    <!-- {{recipes}} -->
    <!-- <div>{{ date }}</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";
import getRecipes from "@/composables/getRecipes";
import RecipeList from "@/components/RecipeList.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "HomeView",
  components: {
    RecipeList,
    Spinner,
  },
  setup() {
    const { recipes, error, fetchData } = getRecipes();

    fetchData();

    // const recipesTest = () => {
    //   console.log(recipes);
    // }
    // recipesTest()

    // get current date >
    // const date = ref("");
    // let currentDate = () => {
    //   return new Date().toLocaleDateString();
    // };
    // onMounted(() => {
    //   date.value = currentDate();
    // });
    // get current date >

    return { recipes, error };
  },
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.home a {
  text-decoration: none;
  color: white;
  background: blueviolet;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: -10px -10px 15px #ffffff, 8px 8px 25px #97a7c3;
}
h2 {
  margin-bottom: 2rem;
  text-align: center;
}
</style>