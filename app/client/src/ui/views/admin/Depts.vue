<script setup lang="ts">

import { ref } from 'vue';
import DeptModal from '../../components/admin/DeptModal.vue';
import { openModal } from '../../../helpers/modal.helper';

const depts = ref([
	{
		id: 1,
		block: {
			id: 1,
			title: 'Технологический'
		},
		title: 'УПП'
	},
	{
		id: 1,
		block: {
			id: 2,
			title: 'Инженерный'
		},
		title: 'ПТК'
	}
])
const createDept = () => {
	openModal('deptModal')
}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Список подразделений</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='createDept'>
				Создать
			</button>
		</div>
	</div>

	<table class="table table-hover">
		<thead>
		<tr>
			<th scope="col">Название</th>
			<th scope="col">Блок</th>
		</tr>
		</thead>
		<tbody>
		<tr class='clickable' v-for="d in depts" :key="d.id">
			<td>{{ d.title }}</td>
			<td>{{ d.block.title }}</td>
		</tr>
		</tbody>
	</table>
	<DeptModal />
</template>

<style scoped></style>