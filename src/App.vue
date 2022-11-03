<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <h1 class="main-title">Recipe Book</h1>
  <div class="main-container">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #ecf0f3;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-container {
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  border-radius: 3rem;
  /* box-shadow: -10px -10px 15px #ffffff,
    8px 8px 25px #97a7c3; */

    box-shadow: -10px -10px 15px #ffffffaa,
    8px 8px 25px #97a7c3,
    inset 10px 10px 15px #ffffffdd,
    inset -8px -8px 15px #97a7c3;
}
.main-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #707579;
  text-transform: uppercase;
}
</style>
