<script setup lang="ts">
import Toast from './components/layout/Toast.vue'
import AppBar from "./components/layout/AppBar.vue";
import { useUserStore } from '../store/user.store';

const userStore = useUserStore();
userStore.getUser();

</script>

<template>
  <AppBar v-if='useUserStore.user?.id'/>

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
