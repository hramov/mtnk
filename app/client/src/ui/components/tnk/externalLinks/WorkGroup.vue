<script setup lang="ts">
import AutoComplete from '../../form/Autocomplete.vue'
import {ref} from "vue";

const workGroups = ref<string[]>([]);

const typeahead = (val: string) => {
  console.log(val)
  workGroups.value.push('КОД-ПОИСКА-ЭК')
}
</script>

<template>
  <AutoComplete placeholder="Рабочие группы" :items="workGroups" @typeahead="typeahead"/>

  <div class="wg-results mb-4">
    Результаты поиска ЭК
  </div>
</template>

<style></style>