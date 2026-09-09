<script setup lang="ts">
import { HhButton } from '@houheaven/kit-vue'
</script>

<template>
  <div style="padding: 24px">
    <h1>hh-kit Vue Demo</h1>
    <HhButton type="primary" @click="() => console.log('primary clicked')">Primary</HhButton>
    <HhButton>Default</HhButton>
  </div>
</template>
