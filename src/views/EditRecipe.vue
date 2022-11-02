<template>
  <form class="create" @submit.prevent="handleUpdate">
    <input v-model="title" type="text" placeholder="Title" />
    <input v-model="ingredients.ingredient_1" type="text" placeholder="Ingredient 1" />
    <input v-model="ingredients.ingredient_2" type="text" placeholder="Ingredient 2" />
    <input v-model="ingredients.ingredient_3" type="text" placeholder="Ingredient 3" />
    <textarea v-model="description" placeholder="Description"></textarea>
    <section class="footer">
      <router-link :to="{ name: 'DetailsView' }">Cancel</router-link>
      <button>Update</button>
    </section>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  props: ["id"],
  setup (props) {
    const router = useRouter();
    const route = useRoute();
    const title = ref("");
    const ingredients = ref({})
    const description = ref("");
    const uri = `http://localhost:3000/recipes/${props.id}`;

    onMounted(() => {
      fetch(uri)
      .then(res => res.json())
      .then(data => {
        console.log(data.title);
        title.value = data.title
        ingredients.value = data.ingredients
        description.value = data.description
      })
    });

    const handleUpdate = async () => {
      try {
        await fetch(uri, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          title: title.value,
          ingredients: ingredients.value,
          description: description.value
        })
      })
      router.push({ name: "HomeView" });
      } catch (err) {
        console.log(err.message)
      }
    }

    return { title, ingredients, description, handleUpdate }
  }
}
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