
<template>
  <div class="hh-header">
    <h1>
      <router-link class="hh-header__title" to="/">
        <slot>标题</slot>
      </router-link>
      <p v-if="subtitle" class="hh-header__subtitle">> {{ subtitle }}</p>
    </h1>
    <a class="hh-header__more" href="http://studio.houheaven.com" target="_blank">更多插件</a>
  </div>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "hh-header",
    computed: {
      subtitle(): string {
        return this.$route.meta?.title ?? "";
      },
    },
  });
</script>

<style lang="less" scoped>
  .hh-header {
    position: relative;
    padding: 20px;
    background: #393d49;
    h1 {
      display: flex;
      place-items: center;
      margin: 0;
    }
    &__title {
      display: block;
      margin: 0;
      font-size: 28px;
      line-height: 45px;
      color: #fff;
    }
    &__subtitle {
      margin: 0 0 0 10px;
      font-size: 20px;
      color: #fff;
      opacity: 0.7;
    }
    &__more {
      position: absolute;
      right: 25px;
      top: 25px;
      padding: 0 20px;
      font: 15px/35px "微软雅黑";
      color: #94979e;
      background: #393d49;
      border: 1px solid #94979e;
      transition: all 0.3s ease 0s;
      border-radius: 20px;
      &:hover {
        color: #c4c7d2;
        border: 1px solid #c4c7d2;
      }
    }
  }
</style>
