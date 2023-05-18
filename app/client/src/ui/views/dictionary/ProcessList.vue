<script setup lang="ts">
import { openModal } from '../../../helpers/modal.helper';
import { onMounted, ref } from 'vue';
import { Process } from '../../../../../shared/tnk';
import { DictionaryService } from '../../../api/dictionary';
import ProcessModal from '../../components/dictionary/process/ProcessModal.vue';
import Filters from './../../components/layout/Filters.vue'

const dictionaryService = new DictionaryService();

const processToEdit = ref<Process>();

const process = ref<Array<Process>>([])
onMounted(async () => {
	process.value = await dictionaryService.getProcessList({});
})

const openProcess = (process: Process) => {
	processToEdit.value = process;
	openModal('processModal');
}

const save = async () => {
	process.value = await dictionaryService.getProcessList({});
}

const applyFilters = () => {

}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Список процессов</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='openProcess({})'>
				Добавить
			</button>
		</div>
	</div>

	<table class="table table-hover">
		<thead>
		<tr>
			<th scope="col">Название</th>
			<th scope="col">Идентификатор</th>
			<th scope="col">Активность</th>
		</tr>
		</thead>
		<tbody>
		<tr class='clickable' v-for='p in process' :key='p.id' @click='openProcess(p)'>
			<td>{{ p.title }}</td>
			<td>{{ p.code }}</td>
			<td>{{ p.isActive ? 'да' : 'нет'}}</td>
		</tr>
		</tbody>
	</table>

	<ProcessModal :process='processToEdit' v-if='processToEdit' @save='save'/>
	<Filters @filters="applyFilters"/>
</template>

<style></style>