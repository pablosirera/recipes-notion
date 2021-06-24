import BaseTransformer from '@/transformers/BaseTransformer'

export default class RecipesTransformer extends BaseTransformer {
  static fetch(recipe) {
    return {
      id: recipe.id,
      name: recipe.properties.Nombre.title[0].plain_text,
      type: {
        color: recipe.properties.Tipo.select.color,
        name: recipe.properties.Tipo.select.name,
      },
      image: recipe.properties.Imagen.url,
    }
  }
}
