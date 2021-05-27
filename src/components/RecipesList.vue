<template>
  <section class="recipe-list">
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
      <img v-if="recipe.img" src="recipe.img" alt="recipe.name" />
      <img v-else src="@/assets/img/pancakes.jpg" alt="recipe.name" />
      <h4>{{ recipe.name }}</h4>
      <span :class="recipe.type.color">
        {{ recipe.type.name }}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecipesList',
  props: {
    recipes: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.recipe-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}
.recipe-item {
  img {
    width: 151px;
    height: 151px;
    border-radius: 16px;
  }
  h4 {
    color: var(--main-text);
    font-size: 17px;
    font-weight: 700;
    margin: 0;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  span {
    color: var(--secondary-text);
    font-size: 12px;
    font-weight: 500;
    padding: 3px 6px;
    border-radius: 10px;
    color: #37352f;
    &.orange {
      background-color: rgba(245, 93, 0, 0.2);
    }
    &.blue {
      background-color: rgba(0, 120, 223, 0.2);
    }
    &.green {
      background-color: rgba(0, 135, 107, 0.2);
    }
  }
}
</style>
