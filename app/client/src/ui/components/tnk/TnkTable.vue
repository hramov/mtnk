<script setup lang="ts">
import {Tnk} from "../../../../../shared/tnk";
import Alert from "../layout/Alert.vue";
import { AlertTypes} from "../../../config/config";
import { openLink } from './../../../router';

type TnkTableProps = {
  tnk: Array<Tnk>
}
const props = defineProps<TnkTableProps>()
</script>

<template>
  <div v-if="!props.tnk || props.tnk.length === 0">
    <Alert :type="AlertTypes.Warning" message="Не удалось получить список ТНК" />
  </div>
  <table v-else class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Название</th>
      <th scope="col">Процесс</th>
      <th scope="col">Подпроцесс</th>
      <th scope="col">Статус</th>
    </tr>
    </thead>
    <tbody>
    <tr class='clickable' v-for="t in props.tnk" :key="t.id" @click="openLink('/tnk/' + t.id)">
      <td>{{ t.title }}</td>
      <td>{{ t.process.title }}</td>
      <td>{{ t.subprocess.title }}</td>
      <td>{{ t.statusId }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style>

</style>