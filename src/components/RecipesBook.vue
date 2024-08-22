<template>
  <div>
    <h2>Search recipes</h2>
    <form @submit.prevent="searchRecipes">
      <div>
        <label for="name">Name of the dish:</label>
        <input type="text" v-model="filters.name" id="name" />
      </div>
      <div>
        <label for="cookingTime">Cooking time (minutes):</label>
        <input type="number" v-model="filters.cookingTime" id="cookingTime" />
      </div>
      <button type="submit">Search</button>
    </form>
  </div>
  <div v-for="recipe in recipes">
    <h2>{{ recipe["name"] }}</h2>
    <p>Ingredients: {{ recipe["ingredients"] }}</p>
    <p>Description: {{ recipe["description"] }}</p>
    <p>Difficulty: {{ recipe["difficulty"] }}</p>
    <p v-if="recipe['cookingTime'] !== undefined">Cooking time: {{ recipe["cookingTime"] }}</p>
    <p v-else>Cooking time: -</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRecipesStore } from '../stores/recipesStore'

const recipesStore = useRecipesStore()

onMounted(() => {
  if (!recipesStore.loaded || !recipesStore.loading) {
    recipesStore.getAllRecipies()
  }
})
const recipes = computed(() => recipesStore.recipes)
const filters = ref({ name: "", cookingTime: null })

async function searchRecipes(filters: Object) {
  recipesStore.getRecipe(filters);
}
</script>
