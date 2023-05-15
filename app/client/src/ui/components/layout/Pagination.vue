<script setup lang="ts">
import {ref} from "vue";
const emit = defineEmits(['page_change'])
const props = defineProps(['pages']);
const activePage = ref(1);

const selectPage = (page: number) => {
  if (activePage.value === page) return;

  activePage.value = page;
  emit('page_change', page)
}
</script>

<template>
  <div style="display: flex; justify-content: center">
    <ul class="pagination">
      <li class="page-item" :class="{active: page === activePage}" v-for="page in props.pages" @click="selectPage(page)"><a class="page-link" href="#">{{ page }}</a></li>
    </ul>
  </div>
</template>

<style></style>