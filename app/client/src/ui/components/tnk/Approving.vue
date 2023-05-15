<script setup lang="ts">
const props = defineProps(['approving'])
</script>

<template>
  <div class="approving">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">Номер</th>
        <th scope="col">Операция по процессу ОД</th>
        <th scope="col">Измеритель</th>
        <th scope="col">Операция ЦОТЭН</th>
        <th scope="col">Длительность</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="a in props.approving" :key="a.id" style="cursor:pointer;">
        <td>{{ a.id }}</td>
        <td>{{ a.title }}</td>
      </tr>
      </tbody>
    </table>

    <div>
      <label>История изменений</label>
      <ul class="list-group">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.approving {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.approving > table {
  width: 60%;
}

.approving > div {
  width: 35%;
}
</style>