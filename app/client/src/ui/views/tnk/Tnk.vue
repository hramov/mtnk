<script setup lang="ts">
import TnkTable from "../../components/tnk/TnkTable.vue";
import TnkModal from "./TnkModal.vue";
import {ref} from "vue";

const tnkDialog = ref(false)
const show = (data: number) => {
    tnkDialog.value = true;
    console.log(data)
}

const dialogClose = () => {
  tnkDialog.value = false;
}

const tnk = {
  title: 'ТНК'
}
</script>

<template>
  <TnkTable @show="show"/>
  <TnkModal :dialog="tnkDialog" @dialogClose="dialogClose" :tnk="tnk"/>
</template>

<style>

</style>