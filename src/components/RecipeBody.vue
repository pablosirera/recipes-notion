<template>
  <section class="recipe-body">
    <component
      :is="getTagByBlock(block.type)"
      v-for="(block, index) in recipe"
      :key="index"
      :number-position="getNumberPosition(block.text)"
    >
      {{ block.text }}
    </component>
  </section>
</template>

<script>
import BulletDetailItem from '@/components/BulletDetailItem.vue'
import NumberedDetailItem from '@/components/NumberedDetailItem.vue'

export default {
  name: 'RecipeBody',
  components: {
    BulletDetailItem,
    NumberedDetailItem,
  },
  props: {
    recipe: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const getTagByBlock = type => {
      const options = {
        heading_3: 'h3',
        bulleted_list_item: 'BulletDetailItem',
        numbered_list_item: 'NumberedDetailItem',
      }

      return options[type]
    }

    const getNumberPosition = textBlock => {
      const numberedItems = props.recipe.filter(
        block => block.type === 'numbered_list_item'
      )
      return numberedItems.findIndex(item => item.text === textBlock) + 1
    }

    return {
      getTagByBlock,
      getNumberPosition,
    }
  },
}
</script>

<style lang="scss" scoped>
.recipe-body {
  h3 {
    color: #3e5481;
    font-weight: bold;
    font-size: 17px;
    line-height: 27px;
  }
}
</style>
