<script setup lang="ts">
import AutoComplete from '../../form/Autocomplete.vue'
import Alert from './../../layout/Alert.vue'
import {ref} from "vue";
import { AihService } from '../../../../api/aih';
import { useRoute } from 'vue-router';
import { TnkService } from '../../../../api/tnk';
import { useToast } from '../../../../helpers/toast.helper';
const props = defineProps(['workGroups']);
const route = useRoute();
const tnkService = new TnkService();

const wgs = ref<any[]>([]);
const currentWorkGroup= ref('');
const aihService = new AihService();
const typeahead = async (val: string) => {
	wgs.value = await aihService.getWorkgroupList({
		title: val,
	});
}

const model = ref(props.workGroups);

const chosen = async (wg: any) => {
	const sure = confirm('Добавить рабочую группу ' + wg.title + '?')
	if (!sure) return;

	currentWorkGroup.value = wg.title;
	const newWg = {
		tnkId: route.params.id,
		title: wg.title,
	}

	const result = await tnkService.addWorkGroup(wg);
	if (result) {
		useToast('success', 'Успешно', 'Рабочая группа ' + wg.title + ' добавлена')
	}
}

const deleteWg = async (wg: any) => {
	const sure = confirm('Удалить рабочую группу ' + wg.title + '?')
	if (!sure) return;

	const result = await tnkService.removeWorkGroup(wg);
	if (result) {
		useToast('success', 'Успешно', 'Рабочая группа ' + wg.title + ' удалена')
	}
}
</script>

<template>
	<label>Введите рабочую группу</label>
  	<AutoComplete :items="wgs" @typeahead="typeahead" :value='currentWorkGroup' @chosen='chosen'/>

  <div class="wg-results mt-4 mb-4">
	  <h4>Рабочие группы</h4>
	  <div v-if='model && model.length' style='display: flex'>
		  <div class="chips removable clickable" style='margin-right: 10px' v-for='wg in model' :key='wg.title' @click='deleteWg(wg)'>{{ wg.title }}</div>
	  </div>
	  <div v-else>
		  <Alert type='warning' message='Не добавлено ни одной РГ'/>
	  </div>
  </div>
</template>

<style>

.chips {
	height: 30px;
	padding: 5px;
	background-color: #2470dc;
	color: white;
	border-radius: 30%;
}
.removable:hover {
	background-color: red;
}
</style>