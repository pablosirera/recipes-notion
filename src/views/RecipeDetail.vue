<template>
  <div class="recipe-detail">
    <div class="image-wrapper">
      <img class="recipe-detail-image" :src="recipe.image" :alt="recipe.name" />
    </div>
    <div class="recipe-body">
      <h1>{{ recipe.name }}</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import RecipesAPI from '@/api/RecipesAPI'

export default {
  setup() {
    const route = useRoute()
    const recipe = ref({})

    const loadRecipes = async () => {
      try {
        const recipes = await new RecipesAPI().listRecipes()
        recipe.value = recipes.find(item => item.id === route.params.id)
        console.log(recipe.value)
      } catch (error) {
        console.error(error)
      }
    }

    const loadBodyRecipes = async pageId => {
      const response = await axios({
        method: 'get',
        url: `https://api.notion.com/v1/blocks/${pageId}/children`,
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_NOTION_SECRET}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2021-05-13',
        },
      })
      console.log(response)
    }

    const loadData = async () => {
      await loadRecipes()
      loadBodyRecipes(route.params.id)
    }

    loadData()

    return {
      recipe,
    }
  },
}
</script>

<style lang="scss" scoped>
.recipe-detail {
  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-wrapper {
    width: 100%;
    height: 375px;
  }

  .recipe-body {
    height: 100%;
    background-color: white;
    padding: 44px 24px;
  }
}
</style>
