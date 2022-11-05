<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="recipe" class="recipe-detail">
    <div class="detail-header">
      <router-link :to="{ name: 'HomeView' }">Back</router-link>
      <h2>Detailed Description</h2>
      <span @click="toggleFavoriteFromDetails" class="material-icons" :class="{favorite: recipe.favorite}">favorite</span>
    </div>
    <hr />
    <h2>{{ recipe.title }}</h2>
    <ul v-for="ingredient in recipe.ingredients" :key="recipe.id">
      <li>{{ ingredient }}</li>
    </ul>
    <p class="detail-desc">{{ recipe.description }}</p>
    <div class="date-section">
      <small>Published {{recipe.createAt}}</small>
      <small v-if="recipe.updateAt">Last Updated {{recipe.updateAt}}</small>
    </div>
    <hr />
    <section class="detail-footer">
      <button @click="deleteRecipe">Delete</button>
      <router-link :to="{name: 'EditForm', params:{id: recipe.id} }">Edit</router-link>
    </section>
<!--      {{recipe.id}}-->
  </div>
  <div v-else>
  <Spinner />
  </div>
</template>

<script>
// import getSingleRecipe from "@/composables/getSingleRecipe";
import fetchService from "@/composables/fetchService";
import Spinner from "@/components/Spinner.vue";
import { onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
export default {
  props: ["id"],
  components: {
    Spinner,
  },
  setup(props) {
    const { fetchedData: recipe, error, fetchData } = fetchService(`http://localhost:3000/recipes/${props.id}`);
    const router = useRouter();
    const route = useRoute();
    const uri = `http://localhost:3000/recipes/${props.id}`;
    onMounted(() => {
      fetchData();
    });

    const deleteRecipe = () => {
      if (confirm('Do you really want to delete this Recipe?')) {
        fetch(uri, { method: 'DELETE' })
        router.push({name: 'HomeView'})
      } else {
        console.log('was not deleted from database');
      }
    }

    const toggleFavoriteFromDetails = async () => {
      await fetch(uri, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({favorite: !recipe.value.favorite})
      }).then(() => {
        fetchData()
      }).catch(err => console.log(err))
    }

    // const handleDelete = (id) => {
    //   recipe.value = recipe.value.filter((recipe) => {
    //     return id !== recipe.id;
    //   });
    // };

    return { recipe, error, deleteRecipe, route, toggleFavoriteFromDetails };
  },
};
</script>

<style scoped>
.recipe-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-header a {
  text-decoration: none;
  color: white;
  background: blueviolet;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
}
ul {
  margin-left: 1rem;
  font-size: 1.25rem;
}
.detail-desc {
  font-size: 1.25rem;
  /*overflow: hidden;*/
  word-break: break-all;
  hyphens: auto;
  white-space: pre-line;
}
.date-section {
  display: flex;
  justify-content: space-between;
  color: grey;
  font-weight: 100;
}
.detail-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-footer button, a {
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
  /* width: 6rem; */
}
.material-icons {
  font-size: 2rem;
  color: #bbb;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: -10px -10px 15px #ffffff, 8px 8px 25px #97a7c3;
}
.material-icons.favorite {
  color: lightcoral;
  box-shadow: inset 5px 5px 10px #00000055, inset -5px -5px 10px #ffffffcc;
}
</style>
