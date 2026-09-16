
<template>
  <button
    class="v-button"
    :disabled="disabled"
    :style="{ backgroundColor: bgColor, color: textColor }"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { color } from "@houheaven/kit-tokens";

  interface Props {
    type?: "primary" | "default";
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: "default",
    disabled: false,
  });

  defineEmits<{ click: [event: MouseEvent]; }>();

  defineSlots<{
    default: () => unknown;
  }>();

  const bgColor = computed(() => (props.type === "primary" ? color.primary : color.background));
  const textColor = computed(() => (props.type === "primary" ? "#fff" : color.text));
</script>

<style scoped>
  .v-button {
    padding: 8px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  .v-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
