<script setup lang="ts">
const props = defineProps(['placeholder', 'items']);
const emit = defineEmits(['chosen', 'typeahead']);

const typeahead = (ev: Event) => {
  const el = ev.target as HTMLInputElement
  emit('typeahead', el.value)
}
const choose = (item: string) => {
  emit('chosen', item);
}
</script>

<template>
  <div class="form-group">
    <label for="input-datalist">{{ props.placeholder }}</label>
    <input type="text" class="form-control" :placeholder="props.placeholder" list="list-items" id="input-datalist" @input="typeahead">
    <datalist id="list-items">
      <option v-for="item in props.items">{{ item }}</option>
    </datalist>
  </div>
</template>

<style></style>