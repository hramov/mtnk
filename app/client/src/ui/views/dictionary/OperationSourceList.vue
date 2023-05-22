<script setup lang="ts">
import Alert from './../../components/layout/Alert.vue';

import { ref } from 'vue';
import { openModal } from '../../../helpers/modal.helper';
import OperationSourceModal from '../../components/dictionary/operation/OperationSourceModal.vue';

const source = ref<any>([])
const openSource = (unit: any) => {
	openModal('operationSourceModal')
}

const save = () => {}

const close = () => {}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Источник операции</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='openSource({})'>
				Добавить
			</button>
		</div>
	</div>

	<table class="table table-hover" v-if='source.length > 0'>
		<thead>
		<tr>
			<th scope="col">Идентификатор</th>
			<th scope="col">Название</th>
			<th scope="col">Порядковый номер</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for='s in source' :key='s.id' class='clickable' @click='openSource(s)'>
			<td>{{ s.id }}</td>
			<td>{{ s.title }}</td>
			<td>{{ s.docNum }}</td>
		</tr>
		</tbody>
	</table>
	<Alert v-else type='warning' message='Нет данных'/>

	<OperationSourceModal :source='{}' :key='1' @save='save' @close='close'/>

	<!--	<Filters @filters="applyFilters"/>-->

</template>

<style></style>