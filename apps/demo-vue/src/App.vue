
<template>
  <div style="padding: 24px">
    <h1>hh-kit Vue Demo</h1>
    <hh-button type="primary" @click="console.log('primary clicked')">Primary</hh-button>
    <hh-button>Default</hh-button>
  </div>
</template>

<script setup lang="ts">
  import { HhButton } from "@houheaven/kit-vue";
</script>
