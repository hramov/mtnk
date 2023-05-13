<script setup lang="ts">
import {LeftMenuItems} from "../../../config/config";
import {openLink} from "../../../router";
</script>

<template>
  <v-navigation-drawer style="background-color: #d8e9f0">
    <v-list style="padding: 0">
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
            v-for="item in LeftMenuItems"
            :key="item.id"
            :title="item.title"
        >
          <v-expansion-panel-text>
            <v-list style="padding: 0; width: 100%">
              <v-list-item v-for="child in item.children" :key="child.id" :value="child.title" @click="openLink(child.url)">{{child.title}}</v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-list>

    <template v-slot:append>
      <v-divider inset></v-divider>
      <div class="pa-2">
        <div>
          Версия: 0.0.1
        </div>
        <div>
          Окружение: тест
        </div>
      </div>
    </template>

  </v-navigation-drawer>
</template>

<style>
.v-expansion-panel-text__wrapper {
  padding: 0 !important;
}
</style>