<script setup lang="ts">
import {ref} from "vue";
import {Api, ApiError} from "../../../api/api";
import {Process, Subprocess} from './../.././../../../shared/tnk';

const process = ref<string[]>([]);
const subprocess = ref<string[]>([]);
const api = new Api();

const searchProcess = async (el: Event) => {
  const val = (el.target as HTMLInputElement).value;
  // TODO some server side search
  const data = await api.get<Process>('tnk/process?title=' + val);
  process.value = data.map((item: any) => item.title);
}

const searchSubprocess = async (el: Event) => {
  const val = (el.target as HTMLInputElement).value;
  // TODO some server side search
  const data = await api.get<Subprocess>('tnk/subprocess?title=' + val);
  subprocess.value = data.map((item: Subprocess) => item.title);
}
</script>

<template>
  <v-sheet width="500" class="pa-7">

    <v-form ref="form">
      <v-text-field
          :counter="10"
          label="Название"
          required
      ></v-text-field>

      <v-autocomplete
          @input="searchProcess"
          clearable
          label="Процесс"
          :items="process"
      ></v-autocomplete>

      <v-autocomplete
          @input="searchSubprocess"
          label="Подпроцесс"
          :items="subprocess"
          clearable
      ></v-autocomplete>

      <v-select
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
      ></v-select>

      <div class="d-flex flex-column">
        <v-btn
            color="success"
            class="mt-4"
            block
        >
          Сохранить
        </v-btn>

        <v-btn
            color="warning"
            class="mt-4"
            block
        >
          Сбросить
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<style></style>