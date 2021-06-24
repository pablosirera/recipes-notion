<template>
  <div class="home">
    <RecipesList :recipes="recipes" @on-click-recipe="goToRecipeDetail" />
  </div>
</template>

<script>
import RecipesList from '@/components/RecipesList.vue'
import RecipesAPI from '@/api/RecipesAPI'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: {
    RecipesList,
  },
  setup() {
    const recipes = ref([])
    const router = useRouter()

    const loadData = async () => {
      try {
        recipes.value = await new RecipesAPI().listRecipes()
        console.log(recipes.value)
      } catch (error) {
        console.error(error)
      }
    }

    const goToRecipeDetail = id => {
      router.push(`/recipe/${id}`)
    }

    loadData()

    return {
      recipes,
      goToRecipeDetail,
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  padding: 24px;
}
</style>
