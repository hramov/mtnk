<script setup lang="ts">
const props = defineProps(['operations']);
const calcSum = () => {
  if (props.operations) {
    return props.operations.reduce((acc: number, item: any) => acc += item.amount * item.duration, 0)
  }
}
</script>

<template>
  <label>Операции</label>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Номер</th>
      <th scope="col">Операция по процессу ОД</th>
      <th scope="col">Измеритель</th>
      <th scope="col">Операция ЦОТЭН</th>
      <th scope="col">Длительность</th>
      <th scope="col">Количество</th>
      <th scope="col">Итого</th>
      <th scope="col">Исполнитель</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="o in props.operations" :key="o.id" style="cursor:pointer;">
      <td>{{ o.id }}</td>
      <td>{{ o.title }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style></style>