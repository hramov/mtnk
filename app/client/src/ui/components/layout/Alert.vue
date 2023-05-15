<script setup lang="ts">

import {AlertTypes} from "../../../config/config";

type AlertProps = {
  type: AlertTypes,
  message: string
}
const props = defineProps<AlertProps>()

const makeAlertClass = () => {
  return `alert alert-${props.type}`
}
</script>

<template>
  <div :class="makeAlertClass()" role="alert">
    {{  props.message }}
  </div>
</template>

<style></style>