<template>
  <div style="margin: 0px">
    <main>
      <div class="add-recipe">
        <label>
          <b>Image Link : </b>
          <input type="text" placeholder="https://www.image.com/..." class="add-recipe__img"
            v-model="newRecipe.recipeImage">
        </label>
        <input type="text" placeholder="Title ..." class="add-recipe__title" v-model="newRecipe.recipeTitle">
        <hr>
        <textarea placeholder="Your Recipe ....." class="add-recipe__desc" v-model="newRecipe.body"></textarea>
        <button class="add-recipe__button" @click="addRecipe">Add Recipe</button>
      </div>
    </main>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  middleware: ["check-auth", "auth"],
  data() {
    return {
      newRecipe: {
        recipeImage: "",
        recipeTitle: "",
        likes: 0,
        body: ""
      }
    }
  },
  methods: {
    addRecipe() {
      // let newId = this.$store.getters.lastIdRecipe + 1
      // this.$store.commit('addNewRecipe', { id: newId, ...this.newRecipe })
      // this.$router.push("/");
      //   axios.post(
      //     "https://bootcamp-timedoor-vuejs-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
      //     this.newRecipe
      //   ).then(response => {
      //     console.log(response)
      //     this.$router.push("/");

      //   })
      // }
      this.$store.dispatch("addRecipe", this.newRecipe)
        .then(() => {
          this.$router.push("/");
        });
    },
  }
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

/* Add Recipe */
.add-recipe__title,
.add-recipe__desc {
  display: block;
  width: 100%;
  margin: 10px 0px;
  border: none;
}

.add-recipe__title {
  height: 50px;
  font-size: 25px;
}

.add-recipe__desc {
  height: 300px;
}

.add-recipe__img {
  border: none;
  height: 30px;
}

.add-recipe__button {
  color: white;
  background-color: #4B56D2;
  border: none;
  padding: 20px;
  border-radius: 15px;
  font-weight: bold;
}

.add-recipe__button:hover {
  cursor: pointer;
  background-color: #82C3EC;
  color: #4B56D2;
}
</style>
