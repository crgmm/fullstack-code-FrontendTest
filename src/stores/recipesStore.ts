import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref([])
  const loaded = ref(false)
  const loading = ref(false)

  const apiUrl = 'http://localhost:3000'

  async function getAllRecipies() {
    loaded.value = false
    loading.value = true
    try {
      const response = await fetch(`${apiUrl}/recipes`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        loaded.value = false
        loading.value = false
        throw new Error(`Response status: ${response.status}`)
      }

      const recipesList = await response.json()
      recipes.value = recipesList
      loaded.value = true
      loading.value = false
    } catch (error) {
      console.error(error)
    }
  }

  async function getRecipe(filters: {name?: string, cookingTime?: number}) {
    const queryParams = new URLSearchParams();

    try {
      if (filters.name) {
        queryParams.append('name', filters.name);
      }
  
      if (filters.cookingTime !== null && filters.cookingTime !== undefined) {
        queryParams.append('cookingTime', filters.cookingTime + '');
      }
  
      const res = await fetch(`${apiUrl}/recipes/recipe?${queryParams.toString() ? queryParams.toString() : ''} `, 
        { method: 'get', headers: {'Content-Type': 'application/json'} });
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }
      const recipesList = await res.json()
      recipes.value = recipesList
    } catch (error) {
      console.error(error)
    }
  }

  /*async function createRecipe(recipe: Object) {
    try {
      const res = await fetch(`${apiUrl}/recipes`, recipe, { method: 'post', headers: {'Content-Type': 'application/json'} });
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }
    } catch (error) {
      console.error(error)
    }
  }*/

  return {
    getAllRecipies,
    getRecipe,
    recipes,
    loading,
    loaded
  }
})
