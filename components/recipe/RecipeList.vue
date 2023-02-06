<template>
  <div class="container">
    <div class="row g-5">
    <RecipeItem v-for="data in dataRecipes" :key="data.id" :recipe="data"></RecipeItem>
    </div>
</div>
</template>
<script>
import RecipeItem from './RecipeItem.vue';
export default {
  components: {
    RecipeItem
  },
  props: ['dataRecipes']
}
</script>
<style>
.recipes {
  display: flex;
  flex-wrap: wrap;
}
</style>
