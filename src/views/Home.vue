<template>
  <div class="home">
    <RecipesList :recipes="recipes" />
  </div>
</template>

<script>
import axios from 'axios'
import RecipesList from '@/components/RecipesList.vue'

export default {
  name: 'Home',
  components: {
    RecipesList,
  },
  data() {
    return {
      recipes: [],
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const databaseId = '6aaa66871aa24090a7bb3dedebb9be5d'
        const response = await axios({
          method: 'post',
          url: `https://api.notion.com/v1/databases/${databaseId}/query`,
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_NOTION_SECRET}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2021-05-13',
          },
          data: {
            filter: {
              property: 'Nombre',
              text: {
                is_not_empty: true,
              },
            },
          },
        })

        this.recipes = this.parseRecipes(response.data.results)
        console.log(this.recipes)
      } catch (error) {
        console.error(error)
      }
    },
    async loadBodyRecipes(pageId) {
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
    },
    parseRecipes(recipes) {
      return recipes.map(recipe => {
        return {
          id: recipe.id,
          name: recipe.properties.Nombre.title[0].plain_text,
          type: {
            color: recipe.properties.Tipo.select.color,
            name: recipe.properties.Tipo.select.name,
          },
        }
      })
    },
  },
}
</script>
