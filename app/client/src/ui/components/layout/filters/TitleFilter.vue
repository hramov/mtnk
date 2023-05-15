<script setup lang="ts">
import { debounce} from "lodash";

const emit = defineEmits(['title_filter']);

const applyFilters = debounce((ev: Event) => {
  emit('title_filter', (ev.target as HTMLInputElement).value)
}, 200);

</script>

<template>
    <div class="mb-3">
      <label for="titleFilter" class="form-label">Название</label>
      <input type="text" class="form-control" id="titleFilter" aria-describedby="titleHelp" @input="applyFilters"/>
      <div id="titleHelp" class="form-text">Можно ввести название не полностью</div>
    </div>
</template>

<style></style>