
<template>
  <div class="home-view">
    <header class="hero">
      <h1>hh-kit Vue Demo</h1>
      <p class="subtitle">Vue 3 组件预览与调试</p>
    </header>

    <section class="nav-section">
      <h2>组件导航</h2>
      <div class="nav-grid">
        <router-link
          v-for="entry in entries"
          :key="entry.path"
          v-slot="{ navigate }"
          :to="entry.path"
          custom
        >
          <v-button type="primary" @click="navigate()">{{ entry.label }}</v-button>
        </router-link>
      </div>
    </section>

    <hh-footer use-houheaven-data />
  </div>
</template>

<script setup lang="ts">
  import hhFooter from "@houheaven/kit-vue/hh-footer";
  import VButton from "../components/v-button.vue";

  interface NavEntry {
    path: string;
    label: string;
  }

  const entries: NavEntry[] = [
    { path: "/hh-footer", label: "hhFooter" },
    { path: "/hh-image-dialog", label: "hhImageDialog" },
  ];
</script>

<style scoped>
  .home-view {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .hero {
    text-align: center;
    padding: 80px 20px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
  }

  .hero h1 {
    margin: 0 0 12px;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .subtitle {
    margin: 0;
    font-size: 15px;
    opacity: 0.85;
  }

  .nav-section {
    flex: 1;
    max-width: 960px;
    margin: 0 auto;
    padding: 48px 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .nav-section h2 {
    font-size: 20px;
    font-weight: 600;
    color: #2a2d33;
    margin: 0 0 24px;
  }

  .nav-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
</style>
