<script setup lang="ts">
import NavigationDrawer from "./components/layout/NavigationDrawer.vue";
import AppBar from "./components/layout/AppBar.vue";
import Snackbar from './components/layout/Snackbar.vue';

</script>

<template>
  <v-card>
    <v-layout>
      <AppBar />

      <NavigationDrawer />

      <v-main><router-view></router-view></v-main>

      <Snackbar />
    </v-layout>
  </v-card>
</template>

<style scoped>
</style>
