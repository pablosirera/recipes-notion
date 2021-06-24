import axios from 'axios'
import RecipesTransformer from '@/transformers/RecipesTransformer'

export default class RecipesAPI {
  baseUrl = 'https://api.notion.com/v1/'

  async listRecipes() {
    const databaseId = '6aaa66871aa24090a7bb3dedebb9be5d'
    const response = await axios({
      method: 'post',
      url: `${this.baseUrl}databases/${databaseId}/query`,
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

    return RecipesTransformer.fetchCollection(response.data.results)
  }
}
