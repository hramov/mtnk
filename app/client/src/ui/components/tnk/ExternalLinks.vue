<script setup lang="ts">
import ConfigItem from "./externalLinks/ConfigItem.vue";
import WorkGroup from "./externalLinks/WorkGroup.vue";
import Operation from "./externalLinks/Operation.vue";
const props = defineProps(['tnk']);
</script>

<template>
	<div class='external-links'>
		<div>
		  <ConfigItem :configItems='tnk.configItems'/>
		  <WorkGroup :workGroups='tnk.workGroups'/>
		</div>
		<div>
	  		<Operation :operations="tnk.operation"/>
		</div>
	</div>
</template>

<style scoped>
</style>