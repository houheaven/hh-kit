
<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="show" class="hh-image-dialog__mask"></div>
    </transition>
    <transition name="slideDown">
      <div v-if="show" class="hh-image-dialog__wrap" @click.self="show = false">
        <div class="hh-image-dialog__card">
          <img class="hh-image-dialog__image" :src="image" :alt="text || ''" />
          <p class="hh-image-dialog__text" v-if="text">{{ text }}</p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, watch } from "vue";
  import "@houheaven/kit-styles/animation.css";

  interface IfImageDialogProps {
    image: string;
    text?: string;
  }

  withDefaults(defineProps<IfImageDialogProps>(), {
    text: "",
  });

  // v-model 双向绑定弹窗显隐
  const show = defineModel<boolean>({ required: true });

  defineOptions({ name: "hh-image-dialog" });

  // ESC 键关闭弹窗
  function evtEscCloseDialog(evt: KeyboardEvent): void {
    if (!show.value) return;
    if (evt.key === "Escape") show.value = false;
  }

  onMounted(() => {
    window.addEventListener("keydown", evtEscCloseDialog);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", evtEscCloseDialog);
  });

  // 监听 show 变化，弹窗开启时页面无法滚动
  watch(show, visible => {
    if (visible)
      // 禁止页面滚动、隐藏滚动条
      document.documentElement.style.overflowY = "hidden";
    else
      // 恢复页面滚动、显示滚动条
      document.documentElement.style.overflowY = "auto";
  });
</script>

<style lang="less">
  .hh-image-dialog {
    &__mask {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(0, 0, 0, 0.3);
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
    }

    &__wrap {
      position: fixed;
      inset: 0;
      z-index: 2001;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__card {
      width: 200px;
      padding: 12px;
      background: #fff;
      border-radius: 12px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 32px);
      box-sizing: content-box;
    }

    &__image {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    &__text {
      width: 100%;
      margin: 6px 0;
      font: 15px/1.6 "微软雅黑", -apple-system, "PingFang SC", sans-serif;
      color: #555;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
