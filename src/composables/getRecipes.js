import { ref } from 'vue';

const getRecipes = () => {
  const recipes = ref([]);
  const error = ref(null);

  const fetchData = async () => {
    try {
      // await new Promise(resolve => {
      //   setTimeout(resolve, 2000)
      // })
      let data = await fetch(`http://localhost:3000/recipes`);
      if (!data.ok) {
        throw Error("No data available");
      }
      recipes.value = await data.json();
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  }
  return {recipes, error, fetchData}
}

export default getRecipes