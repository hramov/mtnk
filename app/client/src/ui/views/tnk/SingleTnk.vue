<script setup lang="ts">
import { Tnk } from '../../../../../shared/tnk'
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {TnkService} from "../../../api/tnk";
import TnkTabs from "../../components/tnk/TnkTabs.vue";
const route = useRoute();
const tnk = ref<Tnk>();
const tnkId = route.params.id;
const tnkService = new TnkService();

onMounted(() => {
  tnkService.getTnk(Number(tnkId)).then(data => tnk.value = data[0])
})

</script>

<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
    <h1 class="h2">{{  tnk.title }}</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Дополнительно
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#">Установить дату обновления ТНК - сегодня</a></li>
          <li><a class="dropdown-item" href="#">Копировать ТНК</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="tnk">
    <TnkTabs :tnk="tnk"/>

    <div class="action-buttons">
      <button class="btn btn-success">Сохранить</button>
      <button class="btn btn-warning">Сбросить</button>
    </div>
  </div>
</template>

<style>
.tnk {
  /*display: flex;*/
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.action-buttons > * {
  margin-left: 10px;
}
</style>