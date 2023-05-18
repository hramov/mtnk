<script setup lang="ts">
import ConfigItem from "./externalLinks/ConfigItem.vue";
import WorkGroup from "./externalLinks/WorkGroup.vue";
import Operation from "./externalLinks/Operation.vue";
const props = defineProps(['tnk']);
const emit = defineEmits(['update']);
</script>

<template>
	<div class='external-links'>
		<div>
		  <ConfigItem :configItems='tnk.configItems' @update="emit('update')"/>
		  <WorkGroup :workGroups='tnk.workGroups' @update="emit('update')"/>
		</div>
		<div>
	  		<Operation :operations="tnk.operation" @update="emit('update')"/>
		</div>
	</div>
</template>

<style scoped>
</style>