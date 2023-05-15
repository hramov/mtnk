<script setup lang="ts">

</script>

<template>
  <v-autocomplete
      hint="Начните вводить название ЭК"
      label="Элемент конфигурации"
      persistent-hint
      prepend-icon="mdi-city"
  >
    <template v-slot:append>
      <v-slide-x-reverse-transition mode="out-in">
        <v-icon
            color="info"
        ></v-icon>
      </v-slide-x-reverse-transition>
    </template>
  </v-autocomplete>

  <div class="wg-results">
    Результаты поиска ЭК
  </div>
</template>

<style></style>