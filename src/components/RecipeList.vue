<template>
  <div class="recipe-list">
    <FilterNav @filterChange="(event) => currentFilter = event" :currentFilter="currentFilter" />
    <div v-for="recipe in filteredRecipes" :key="recipe.id">
      <SingleRecipe :recipe="recipe" @favorite="handleFavorite" />
      <!-- props "recipe" zu SingleRecipe Komponent weiterleiten -->
      <!-- <h3>{{ recipe.title }}</h3> -->
      <!-- instead of showing the content(title, description, ...) in RecipeList we'll move it to separate component - SingleRecipe -->
      <!-- <p>{{recipe.description}}</p> -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import SingleRecipe from "@/components/SingleRecipe.vue";
import FilterNav from "@/components/FilterNav.vue";
export default {
  props: ["recipes"],
  components: {
    SingleRecipe,
    FilterNav
  },
  setup(props) {
    console.log(props.recipes);
    const currentFilter = ref("all")

    const handleFavorite = (id) => {
      let fav = props.recipes.find((recipe) => {
        return recipe.id === id;
      });
      fav.favorite = !fav.favorite;
    };

    const filteredRecipes = computed(() => {
      if (currentFilter.value === 'favorite') {
        return props.recipes.filter(recipe => recipe.favorite)
      } 
      return [...props.recipes]
    }
    ) 

    return { handleFavorite, currentFilter, filteredRecipes };
  },
};
</script>

<style scoped>
.recipe-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 70vh;
  overflow-y: auto;
  padding: 2rem;
}
</style>
