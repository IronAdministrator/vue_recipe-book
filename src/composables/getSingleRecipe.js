import { ref } from 'vue';

const getSingleRecipe = (id) => {
  const recipe = ref(null);
  const error = ref(null);

  const fetchData = async () => {
    try {
      // await new Promise(resolve => {
      //   setTimeout(resolve, 1000)
      // })
      let data = await fetch(`http://localhost:3000/recipes/${id}`);
      if (!data.ok) {
        throw Error("Recipe does not exists");
      }
      recipe.value = await data.json();
    } 
    catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  }
  return {recipe, error, fetchData}
}

export default getSingleRecipe