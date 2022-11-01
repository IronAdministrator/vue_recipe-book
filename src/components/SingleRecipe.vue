<template>
  <div class="recipe">
    <div class="title">
      <h2 class="title-text">{{ recipe.title }}</h2>
      <span @click="toggleFavorite" class="material-icons" :class="{favorite: recipe.favorite}">favorite</span>
    </div>
    <p class="desc">
      <router-link :to="{ name: 'DetailsView', params: { id: recipe.id } }">
        {{ snippetDesc }}
      </router-link>
    </p>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: ["recipe"],
  setup(props, {emit}) {
    const uri = `http://localhost:3000/recipes/${props.recipe.id}`;


    const snippetDesc = computed(() => {
      return `${props.recipe.description.substring(0, 60)} ....`;
    });

    const toggleFavorite = () => {
      fetch(uri, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({favorite: !props.recipe.favorite})
      }).then(() => {
        emit('favorite', props.recipe.id)
      }).catch(err => console.log(err))
    }

    // const toggleActive = () => {
    //   isActive.value = !isActive.value
    // }

    return { snippetDesc, toggleFavorite };
  },
};
</script>

<style scoped>
.recipe {
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: -10px -10px 15px #ffffff, 8px 8px 25px #97a7c3;
}
.recipe .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.recipe .desc {
  cursor: pointer;
  max-width: 30rem;
}
.recipe .desc a {
  text-decoration: none;
  color: #2c3e50;
}
.material-icons {
  font-size: 2rem;
  color: #bbb;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: -10px -10px 15px #ffffff, 8px 8px 25px #97a7c3;
}
.material-icons:hover {
  color: #777;
}
.material-icons.favorite {
  color: lightcoral;
  box-shadow: inset 5px 5px 10px #00000055, inset -5px -5px 10px #ffffffcc;
}
</style>
