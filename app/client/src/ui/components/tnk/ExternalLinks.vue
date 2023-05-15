<script setup lang="ts">
import ConfigItem from "./externalLinks/ConfigItem.vue";
import WorkGroup from "./externalLinks/WorkGroup.vue";
import Operation from "./externalLinks/Operation.vue";
</script>

<template>
  <ConfigItem />
  <WorkGroup />
  <Operation :operations="[]"/>
</template>

<style></style>