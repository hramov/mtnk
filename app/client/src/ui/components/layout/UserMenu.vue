<script setup lang="ts">
import { UserMenuItems} from "../../../config/config";
import {openLink} from "../../../router";
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
          color="black"
          v-bind="props"
      >
        Храмов Сергей Иванович
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="item in UserMenuItems"
          :key="item.id"
          :value="item.title"
          @click="openLink(item.url)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>