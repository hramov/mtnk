<script setup lang="ts">
import Alert from './../../components/layout/Alert.vue';

import { ref } from 'vue';
import OperationUnitModal from '../../components/dictionary/operation/OperationUnitModal.vue';
import { openModal } from '../../../helpers/modal.helper';

const units = ref<any>([])
const openUnit = (unit: any) => {
	openModal('operationUnitModal')
}

const save = () => {}

const close = () => {}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Единица измерения операции</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='openUnit({})'>
				Добавить
			</button>
		</div>
	</div>

	<table class="table table-hover" v-if='units.length > 0'>
		<thead>
		<tr>
			<th scope="col">Идентификатор</th>
			<th scope="col">Название</th>
			<th scope="col">Порядковый номер</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for='u in units' :key='u.id' class='clickable' @click='openUnit(u)'>
			<td>{{ u.id }}</td>
			<td>{{ u.title }}</td>
			<td>{{ u.docNum }}</td>
		</tr>
		</tbody>
	</table>
	<Alert v-else type='warning' message='Нет данных'/>

		<OperationUnitModal :unit='{}' :key='1' @save='save' @close='close'/>

	<!--	<Filters @filters="applyFilters"/>-->

</template>

<style></style>