<script setup lang="ts">
import AutoComplete from '../../form/Autocomplete.vue'
import {ref} from "vue";
import Alert from '../../layout/Alert.vue';
import { AihService } from '../../../../api/aih';
import { ConfigItem} from './../../../../../../shared/tnk';
const emit = defineEmits(['update']);
const props = defineProps(['configItems']);
const aihService = new AihService();

const configItems = ref<ConfigItem[]>([]);
const currentConfigItem = ref('');

const typeahead = async (val: string) => {
  configItems.value = await aihService.getConfigItemList({
	  title: val,
  });
}

const chosen = () => {

}
</script>

<template>
	<label>Введите элемент конфигурации</label>
  	<AutoComplete placeholder="Элементы конфигурации" :items="configItems" @typeahead="typeahead" @chosen='chosen' :value='currentConfigItem'/>

  	<div class="wg-results mt-4 mb-4">
		<h4>Элементы конфигурации</h4>
		<div v-if='configItems.length'>
			<span class="badge rounded-pill bg-primary" v-for='ci in configItems' :key='ci.title'>{{ ci.title }}</span>
		</div>
		<div v-else>
			<Alert type='warning' message='Не добавлено ни одного ЭК'/>
		</div>
  	</div>
</template>

<style></style>