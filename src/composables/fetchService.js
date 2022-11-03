import { ref } from 'vue';

const getRecipes = (url) => {
  const fetchedData = ref(null);
  const error = ref(null);

  const fetchData = async () => {
    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw Error("No data available");
      }
      fetchedData.value = await data.json();
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  }
  return {fetchedData, error, fetchData}
}

export default getRecipes