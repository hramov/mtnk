<script setup lang="ts">
import Toast from './components/layout/Toast.vue'
import AppBar from "./components/layout/AppBar.vue";
</script>

<template>
  <AppBar />

  <div class="container-fluid">
    <div class="row">
      <main class="px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>

  <Toast />
</template>

<style scoped>
</style>
