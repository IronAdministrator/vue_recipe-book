<template>
  <div class="recipe-list">
    <div v-for="recipe in recipes" :key="recipe.id">
      <SingleRecipe :recipe="recipe" @favorite="handleFavorite" />
      <!-- props "recipe" zu SingleRecipe Komponent weiterleiten -->
      <!-- <h3>{{ recipe.title }}</h3> -->
      <!-- instead of showing the content(title, description, ...) in RecipeList we'll move it to separate component - SingleRecipe -->
      <!-- <p>{{recipe.description}}</p> -->
    </div>
  </div>
</template>

<script>
import SingleRecipe from "@/components/SingleRecipe.vue";
export default {
  props: ["recipes"],
  components: {
    SingleRecipe,
  },
  setup(props) {
    console.log(props.recipes);

    const handleFavorite = (id) => {
      let fav = props.recipes.find((recipe) => {
        return recipe.id === id;
      });
      fav.favorite = !fav.favorite;
    };

    return { handleFavorite };
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
