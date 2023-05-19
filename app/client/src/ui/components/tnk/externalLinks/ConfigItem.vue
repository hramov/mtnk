<script setup lang="ts">
import AutoComplete from '../../form/Autocomplete.vue'
import Alert from './../../layout/Alert.vue'
import {ref} from "vue";
import { AihService } from '../../../../api/aih';
import { useRoute } from 'vue-router';
import { TnkService } from '../../../../api/tnk';
import { useToast } from '../../../../helpers/toast.helper';
const props = defineProps(['configItems']);
const emit = defineEmits(['update']);
const route = useRoute();
const tnkService = new TnkService();
const tnkId: string = route.params.id as string;

const cis = ref<any[]>([]);
const currentConfigItem= ref('');
const aihService = new AihService();
const typeahead = async (val: string) => {
	cis.value = await aihService.getConfigItemList({
		title: val,
	});
}

const model = ref(props.configItems);

const chosen = async (ci: any) => {
	const sure = confirm('Добавить элемент конфигурации ' + ci.title + '?')
	if (!sure) return;

	currentConfigItem.value = ci.title;
	const newCi = {
		tnkId: route.params.id,
		title: ci.title,
	}

	const result = await tnkService.addConfigItem(newCi, tnkId);
	if (result) {
		useToast('success', 'Успешно', 'Элемент конфигурации ' + ci.title + ' добавлен');
		emit('update');
	}
}

const deleteCi = async (ci: any) => {
	const sure = confirm('Удалить элемент конфигурации ' + ci.title + '?')
	if (!sure) return;

	const result = await tnkService.removeConfigItem(ci, tnkId);
	if (result) {
		useToast('success', 'Успешно', 'Элемент конфигурации ' + ci.title + ' удален');
		emit('update')
	}
}
</script>

<template>
	<label>Введите элемент конфигурации</label>
	<AutoComplete :items="cis" @typeahead="typeahead" :value='currentConfigItem' @chosen='chosen'/>

	<div class="ci-results mt-4 mb-4">
		<h4>Элементы конфигурации</h4>
		<div v-if='model && model.length' style='display: flex'>
			<div class="chips removable clickable" style='margin-right: 10px' v-for='ci in model' :key='ci.title' @click='deleteCi(ci)'>{{ ci.title }}</div>
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