<script setup lang="ts">
import { Tnk } from '../../../../../shared/tnk'
import {useRoute} from "vue-router";
import {ref} from "vue";
import {TnkService} from "../../../api/tnk";
import TnkTabs from "../../components/tnk/TnkTabs.vue";

const route = useRoute();
const tnk = ref<Tnk>();
const tnkId = route.params.id;
const tnkService = new TnkService();

tnkService.getTnk(String(tnkId)).then(data => tnk.value = data);

const update = async () => {
	tnkService.getTnk(String(tnkId)).then(data => tnk.value = data);
}
</script>

<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3" v-if='tnk'>
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
    <TnkTabs :tnk="tnk" v-if='tnk' @update='update'/>
  </div>
</template>