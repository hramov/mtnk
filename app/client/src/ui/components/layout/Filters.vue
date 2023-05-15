<script setup lang="ts">
import {ref} from "vue";
import TitleFilter from "./filters/TitleFilter.vue";
const emit = defineEmits(['filters']);

export type Filters = {
  [key: string]: string | number
}

const filters = ref<Filters>({});

const applyFilters = (field: string, data: string) => {
  filters.value[field] = data;
}

const applyTitleFilter = (data: string) => {
  applyFilters('title', data)
}

const apply = () => {
  emit('filters', filters.value)
}
</script>

<template>
  <div class="modal fade" id="filtersModal" tabindex="-1" aria-labelledby="filtersModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="filtersModalLabel">Фильтры</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <TitleFilter @title_filter="applyTitleFilter"/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary" @click="apply">Применить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>