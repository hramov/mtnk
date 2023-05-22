<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DictionaryService } from '../../../api/dictionary';
import { openModal } from '../../../helpers/modal.helper';
import Alert from '../../components/layout/Alert.vue';
import Filters from './../../components/layout/Filters.vue'
import OperationModal from '../../components/dictionary/operation/OperationModal.vue';

const dictionaryService = new DictionaryService();

const operations = ref<any[]>([]);
const operationToEdit = ref<any>({});

onMounted(async () => {
	operations.value = await dictionaryService.getOperationList({});
});

const openOperation = (operation: any) => {
	operationToEdit.value = Object.assign({}, operation);
	openModal('operationModal');
}

const save = async (data: any) => {
	data.itsmProcess = {
		id: data.itsmProcessId,
	}
	await dictionaryService.saveSubprocess(data);
	operations.value = await dictionaryService.getOperationList({});
}

const close = () => {
	operationToEdit.value = {};
}

const applyFilters = (filters: any) => {

}

</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Список эталонных операций</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='openOperation({})'>
				Добавить
			</button>
		</div>
	</div>

	<table class="table table-hover" v-if='operationToEdit.length > 0'>
		<thead>
		<tr>
			<th scope="col">Название</th>
			<th scope="col">ITSM процесс</th>
			<th scope="col">Идентификатор</th>
			<th scope="col">Активность</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for='o in operationToEdit' :key='o.id' class='clickable' @click='openOperation(o)'>
			<td>{{ o.title }}</td>
			<td>{{ o.itsmProcess.title }}</td>
			<td>{{ o.code }}</td>
			<td>{{ o.isActive ? 'да' : 'нет' }}</td>
		</tr>
		</tbody>
	</table>
	<Alert v-else type='warning' message='Нет данных'/>

	<OperationModal :operation='operationToEdit' :key='1' @save='save' @close='close'/>

	<Filters @filters="applyFilters" :fields="['title']"/>
</template>

<style></style>