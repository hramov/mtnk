<script setup lang="ts">
import AutoComplete from '../../form/Autocomplete.vue'
import {ref} from "vue";

const configItems = ref<string[]>([]);

const typeahead = (val: string) => {
  console.log(val)
  configItems.value.push('КОД-ПОИСКА-ЭК')
}
</script>

<template>
  <AutoComplete placeholder="Элементы конфигурации" :items="configItems" @typeahead="typeahead"/>

  <div class="wg-results mb-4">
    Результаты поиска ЭК
  </div>
</template>

<style></style>