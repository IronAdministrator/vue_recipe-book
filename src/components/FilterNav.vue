<template>
  <div class="filter-nav">
    <button @click="updateFilter('all')" :class="{active: currentFilter === 'all'}">All</button>
    <button @click="updateFilter('favorite')" :class="{active: currentFilter === 'favorite'}">Favorite</button>
  </div>
</template>

<script>
export default {
  props: ["currentFilter"],
  setup(props, {emit}) {
    const updateFilter = (filterBy) => {
      emit('filterChange', filterBy)
    }

    return {updateFilter};
  },
};
</script>

<style scoped>
.filter-nav {
  display: flex;
  gap: .5rem;
}
.filter-nav button {
  background: none;
  border: none;
  color: #bbb;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}
.filter-nav button.active {
  color: #555;
}
</style>
