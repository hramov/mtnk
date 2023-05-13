<script setup lang="ts">
import {useLayoutStore} from "../../../store/layout/layout";

const layoutStore = useLayoutStore();
</script>

<template>
  <div class="text-center ma-2">
    <v-snackbar
        v-model="layoutStore.showSnackbar"
        :timeout="3000"
        :color="layoutStore.snackbarType"
    >
      {{ layoutStore.snackbarMessage }}
      <template v-slot:actions>
        <v-btn
            color="pink"
            variant="text"
            @click="layoutStore.showSnackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style></style>