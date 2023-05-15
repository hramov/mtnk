<script setup lang="ts">
import ConfigItem from "./externalLinks/ConfigItem.vue";
import WorkGroup from "./externalLinks/WorkGroup.vue";
import Operation from "./externalLinks/Operation.vue";
</script>

<template>
  <v-sheet width="50%" class="pa-7">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
          Связи с внешними объектами
        </v-card-title>

        <v-card-text>
          <div class="text-caption pa-3">Заполните связи для отправки ТНК на согласование</div>
          <ConfigItem />
          <WorkGroup />
          <Operation />
        </v-card-text>
      </v-card>
  </v-sheet>
</template>

<style></style>