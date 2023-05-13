<script setup lang="ts"></script>

<template>
  <v-app-bar :color="'#3cbbf2'">
    <v-app-bar-title><strong>МТНК</strong></v-app-bar-title>
    <template v-slot:append>
      <UserMenu />
    </template>
  </v-app-bar>
</template>
<script>
import UserMenu from "./UserMenu.vue";
export default {
  components: {UserMenu}
}
</script>