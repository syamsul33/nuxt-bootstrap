<template>
  <div>
    <main>
      <img class="recipes-detail__img" alt="Pasta" :src="$route.params.detail.recipeImage" />
      <h1 class="recipes-detail__title">
        {{ $route.params.detail.recipeTitle }}
      </h1>
      <p class="recipes-detail__body">
        {{ $route.params.detail.body }}
      </p>
    </main>

  </div>
</template>
<script>
export default {
  name: 'detailPage'
}
</script>
<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  background-color: #EEF2E6;
}

main {
  margin: 22px;
}

.recipes {
  display: flex;
  flex-wrap: wrap;
}

.header-nav__link {
  margin-left: 20px;
  color: black;
  text-decoration: none;
  font-size: 20px;
}

/* Detail */
.recipes-detail {
  display: flex;
  justify-content: center;
}

.recipes-detail div {
  width: 600px;
}

.recipes-detail__img {
  width: 400px;
  height: 300px;
  display: block;
  text-align: center;
  margin: 0px auto;
}

.recipes-detail__title,
.recipes-detail__body {
  text-align: center;
}
</style>
