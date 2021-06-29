<template>
  <div class="numered-detail">
    <span class="numbered-position">{{ numberPosition }}</span>
    <p><slot /></p>
  </div>
</template>

<script>
export default {
  name: 'NumberedDetailItem',
  props: {
    numberPosition: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss" scoped>
.numered-detail {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  .numbered-position {
    background-color: var(--main-text);
    color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 100px;
    padding: 5px 9px;
  }
  p {
    margin: 0;
    margin-left: 16px;
  }
}
</style>
