<template>
  <div class="bullet-item">
    <img class="check-bullet" src="@/assets/img/check.svg" alt="ingrediente" />
    <p><slot /></p>
  </div>
</template>

<script>
export default {
  name: 'BulletDetailItem',
}
</script>

<style lang="scss" scoped>
.bullet-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  p {
    margin: 0;
    margin-left: 8px;
    color: var(--main-text);
    font-weight: 500;
    font-size: 15px;
  }
  .check-bullet {
    background: #e3fff8;
    border-radius: 100px;
    padding: 6px;
  }
}
</style>
