<script setup lang="ts">
import TnkForm from "./TnkForm.vue";
import ExternalLinks from "./ExternalLinks.vue";
import Approving from "./Approving.vue";
import {ref} from "vue";
const emit = defineEmits(['update'])
const props = defineProps(['tnk'])
const tab = ref<string>('default');

const tabs = {
  'default': TnkForm,
  'externalLinks': ExternalLinks,
  'approving': Approving
};

const open = (newTab: string) => {
  tab.value = newTab;
}

const isActiveTab = (currentTab: string) => tab.value === currentTab;

</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" :class="{active: isActiveTab('default')}" aria-current="page" href="#" @click="open('default')">Основная информация</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" :class="{active: isActiveTab('externalLinks')}" href="#" @click="open('externalLinks')">Связи с внешними объектами</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" :class="{active: isActiveTab('approving')}" href="#" @click="open('approving')">Согласование</a>
    </li>
  </ul>

  <div class="data-body">
    <component :is="tabs[tab]" :tnk="props.tnk" @update="emit('update')"></component>
  </div>
</template>

<style>
.data-body {
  margin-top: 30px;
}
</style>