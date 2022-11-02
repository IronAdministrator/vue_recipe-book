<template>
  <h2>All Recipes</h2>
  <form class="create" @submit.prevent="handleSubmit">
    <input v-model="title" type="text" placeholder="Title" />
    <input v-model="ingredients.ingredient_1" type="text" placeholder="Ingredient 1" />
    <input v-model="ingredients.ingredient_2" type="text" placeholder="Ingredient 2" />
    <input v-model="ingredients.ingredient_3" type="text" placeholder="Ingredient 3" />
    <textarea v-model="description" placeholder="Description"></textarea>
    <section class="footer">
      <router-link :to="{ name: 'HomeView' }">Back</router-link>
      <button>Add</button>
    </section>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const title = ref("");
    const ingredients = ref({
      ingredient_1: "",
      ingredient_2: "",
      ingredient_3: ""
    })
    const description = ref("");
    const favorite = ref(false);
    const date = ref("");
    const time = ref("");
    const dateTime = ref("");

    // get current date >
    // let currentDate = () => {
    //   return new Date().toLocaleDateString();
    // };
    // let currentTime = () => {
    //   return new Date().toLocaleTimeString();
    // };
    // onMounted(() => {
    //   date.value = currentDate();
    //   time.value = currentTime();
    //   dateTime.value = `${date.value} / ${time.value}`;
    // });
    // get current date >

    const handleSubmit = async () => {
      // let currentDate = () => {
      //   return new Date().toLocaleDateString();
      // };
      // let currentTime = () => {
      //   return new Date().toLocaleTimeString();
      // };
      // date.value = currentDate();
      // time.value = currentTime();
      // dateTime.value = `${date.value} / ${time.value}`;
      let recipe = {
        title: title.value,
        ingredients: ingredients.value,
        description: description.value,
        favorite: favorite.value,
        createAt: `${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`,
      };
      try {
        await fetch("http://localhost:3000/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe),
        });
      } catch (err) {
        console.log(err.message);
      }
      router.push({ name: "HomeView" });
    };

    return {
      title,
      ingredients,
      description,
      favorite,
      date,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
input,
textarea {
  height: 3.5rem;
  padding: 0 1.5rem;
  border-radius: 3rem;
  box-shadow: inset -4px -4px 5px #ffffff, inset 4px 4px 5px #97a7c3;
  border: none;
  font-size: 1rem;
}
textarea {
  white-space: pre;
  padding: 1.3rem;
  min-height: 20%;
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
