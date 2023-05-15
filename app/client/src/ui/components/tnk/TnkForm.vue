<script setup lang="ts">
import {reactive, ref} from "vue";
import {Api} from "../../../api/api";
import {Process, Subprocess, Tnk} from './../../../../../shared/tnk';

const model = reactive<Tnk>(new Tnk());
const process = ref<string[]>([]);
const subprocess = ref<string[]>([]);
const api = new Api();

const searchProcess = async (el: Event) => {
  const val = (el.target as HTMLInputElement).value;
  const data = await api.get<Process>('tnk/process?title=' + val);
  process.value = data.map((item: any) => item.title);
}

const searchSubprocess = async (el: Event) => {
  const val = (el.target as HTMLInputElement).value;
  const data = await api.get<Subprocess>('tnk/subprocess?title=' + val);
  subprocess.value = data.map((item: Subprocess) => item.title);
}
</script>

<template>
  <v-sheet width="50%" class="pa-7">

    <v-card>
      <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
        Основные свойства
      </v-card-title>

      <v-card-text>
        <div class="text-caption pa-3">Заполните основные свойства для сохранения ТНК</div>

        <v-form ref="form">
          <v-text-field
              :counter="10"
              label="Название"
              required
              v-model="model.title"
          ></v-text-field>

          <v-switch label="ТНК по атрибутам"></v-switch>

          <v-autocomplete
              @input="searchProcess"
              clearable
              label="Процесс"
              :items="process"
              v-model="model.process"
          ></v-autocomplete>

          <v-autocomplete
              @input="searchSubprocess"
              label="Подпроцесс"
              :items="subprocess"
              clearable
              v-model="model.subprocess"
          ></v-autocomplete>

          <v-select
              label="Статус"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-select>

          <v-switch label="Активна"></v-switch>

          <v-switch label="Реализуемость ЦС"></v-switch>

          <v-select
              label="Автоматизация"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-select>

          <v-select
              label="Вид ТНК"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          ></v-select>
        </v-form>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<style></style>