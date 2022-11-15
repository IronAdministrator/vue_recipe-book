<template>
  <div>
    <h2 v-if="route.params.id">Edit Recipe</h2>
    <h2 v-else>Add Recipe</h2>
  </div>
  <form class="create" @submit.prevent="handleSubmit">
    <input v-model="title" type="text" placeholder="Title"/>
    <div class="ingredients-container" v-for="(ingredient, index) in ingredients" :key="`ingredientInput-${index}`">
      <input v-model="ingredient.ingredient" type="text" placeholder="Ingredient"/>
      <span @click="addIngredient(ingredients)" class="material-icons">add</span>
      <span v-if="ingredients.length > 1" @click="removeIngredient(ingredients, index)"
            class="material-icons remove">remove</span>
    </div>
    <!-- <input v-model="ingredients.ingredient_1" type="text" placeholder="Ingredient 1" />
    <input v-model="ingredients.ingredient_2" type="text" placeholder="Ingredient 2" />
    <input v-model="ingredients.ingredient_3" type="text" placeholder="Ingredient 3" /> -->
    <textarea v-model="description" placeholder="Description"></textarea>
    <section class="footer">
      <router-link v-if="route.params.id" :to="{ name: 'DetailsView' }">Back</router-link>
      <router-link v-else :to="{ name: 'HomeView' }">Back</router-link>
      <button>
        <span v-if="route.params.id">Update</span>
        <span v-else>Add</span>
      </button>
    </section>
  </form>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();
const title = ref("");
const ingredients = ref([
  {ingredient: ""}
])
const description = ref("");
const favorite = ref(false);
const date = ref("");
const time = ref("");
const dateTime = ref("");
const uri = `http://localhost:3000/recipes/${route.params.id}`;

const addIngredient = (ingredients) => {
  ingredients.push({})
  console.log(ingredients.length);
}

const removeIngredient = (ingredients, index) => {
  if (ingredients.length > 1) {
    ingredients.splice(index, 1)
  } else {
    alert("You need two have at least one Ingredient")
  }
  console.log(ingredients.length);
}

onMounted(() => {
  if (route.params.id) {
    fetch(uri)
        .then(res => res.json())
        .then(data => {
          console.log(data.title);
          title.value = data.title
          ingredients.value = data.ingredients
          description.value = data.description
        })
  }
});

const handleSubmit = async () => {
  const options = {day: "numeric", month: "long", year: "numeric", hourCycle: "h24", hour: "numeric", minute: "numeric"}
  let recipe = {
    title: title.value,
    ingredients: ingredients.value,
    description: description.value,
    favorite: favorite.value,
    createAt: `${new Date().toLocaleDateString()}`,
    updateAt: "",
  };
  try {
    if (route.params.id) {
      await fetch(uri, {
        method: 'PATCH',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify({
          title: title.value,
          ingredients: ingredients.value,
          description: description.value,
          updateAt: `${new Date().toLocaleString("en-US", options)}`,
        })
      })
    } else {
      await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(recipe),
      });
    }
  } catch (err) {
    console.log(err.message);
  }
  await router.push({name: "HomeView"});
};
</script>

<style scoped>
h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

input,
textarea {
  min-height: 3.5rem;
  padding: 0 1.5rem;
  border-radius: 3rem;
  box-shadow: inset -4px -4px 5px #ffffff, inset 4px 4px 5px #97a7c3;
  border: none;
  font-size: 1rem;
  flex: 1 1 auto;
}

textarea {
  padding: 1.3rem;
  min-height: 20%;
  /*word-break: break-all;*/
  /*overflow-wrap: break-word;*/
  white-space: pre-line;
}

.ingredients-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ingredients-container .material-icons {
  font-size: 1rem;
  background-color: #ecf0f3;
  color: lightseagreen;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: -10px -10px 15px #ffffff, 8px 8px 25px #97a7c3;
  transition: all 500ms;
}

.ingredients-container .material-icons:hover {
  transform: scale(1.1);
}

.ingredients-container .material-icons.remove {
  color: lightcoral;
}

button,
a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  background: blueviolet;
  padding: 1rem;
  border-radius: 3rem;
  text-align: center;
  box-shadow: -10px -10px 15px #ffffff, 8px 8px 25px #97a7c3;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  max-height: 2.5rem;
  width: 5rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
