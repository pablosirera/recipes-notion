<template>
  <div class="recipe-detail">
    <div class="image-wrapper">
      <img class="recipe-detail-image" :src="recipe.image" :alt="recipe.name" />
    </div>
    <div class="recipe-body-wrapper">
      <h1>{{ recipe.name }}</h1>
      <hr class="divider" />
      <RecipeBody :recipe="recipeBody" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import RecipesAPI from '@/api/RecipesAPI'
import RecipeBody from '@/components/RecipeBody.vue'

export default {
  components: {
    RecipeBody,
  },
  setup() {
    const route = useRoute()
    const recipe = ref({})
    const recipeBody = ref([])

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

      recipeBody.value = assembleRecipeBody(response.data.results)
      console.log(recipeBody.value)
    }

    const assembleRecipeBody = recipeBlocks => {
      return recipeBlocks
        .map(block => {
          const type = block.type

          if (block[type].text.length) {
            const text = block[type].text[0].text.content

            return {
              type,
              text,
            }
          }
        })
        .filter(Boolean)
    }

    const loadData = async () => {
      await loadRecipes()
      loadBodyRecipes(route.params.id)
    }

    loadData()

    return {
      recipe,
      recipeBody,
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

  .recipe-body-wrapper {
    height: 100%;
    background-color: white;
    padding: 44px 24px;

    h1 {
      color: #3e5481;
      font-size: 17px;
      font-weight: bold;
    }

    .divider {
      background-color: #d0dbea;
    }
  }
}
</style>
