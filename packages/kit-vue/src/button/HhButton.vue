<script setup lang="ts">
import { computed } from 'vue'
import { color } from '@houheaven/kit-tokens'

interface Props {
  type?: 'primary' | 'default'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  disabled: false,
})

defineEmits<{ click: [event: MouseEvent] }>()

const bgColor = computed(() => (props.type === 'primary' ? color.primary : color.background))
const textColor = computed(() => (props.type === 'primary' ? '#fff' : color.text))
</script>

<template>
  <button
    class="hh-button"
    :disabled="disabled"
    :style="{ backgroundColor: bgColor, color: textColor }"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.hh-button {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.hh-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
