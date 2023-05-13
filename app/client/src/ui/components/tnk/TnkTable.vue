<script setup lang="ts">

const emit = defineEmits(['show'])
const tnkList = [
  {
    id: 1,
    title: 'Название ТНК',
    process: 'Процесс',
    subprocess: 'Подпроцесс',
    status: 'Утверждена',
  },
]
</script>

<template>
  <v-table fixed-header>
    <thead>
    <tr>
      <th class="text-left">
        Название
      </th>
      <th class="text-left">
        Процесс
      </th>
      <th class="text-left">
        Подпроцесс
      </th>
      <th class="text-left">
        Статус
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="tnk in tnkList"
        :key="tnk.id"
        @click="emit('show', tnk.id)"
    >
      <td>{{ tnk.title }}</td>
      <td>{{ tnk.process }}</td>
      <td>{{ tnk.subprocess }}</td>
      <td>{{ tnk.status }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<style>

</style>