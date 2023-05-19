<script setup lang="ts">

import { ref } from 'vue';
import { openModal } from '../../../helpers/modal.helper';
import BlockModal from '../../components/admin/BlockModal.vue';

const blocks = ref([
	{
		id: 1,
		title: 'Технологический'
	},
	{
		id: 1,
		title: 'Инженерный'
	}
])
const createBlock = () => {
	openModal('blockModal')
}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Список блоков</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='createBlock'>
				Создать
			</button>
		</div>
	</div>

	<table class="table table-hover">
		<thead>
		<tr>
			<th scope="col">Название</th>
		</tr>
		</thead>
		<tbody>
		<tr class='clickable' v-for="b in blocks" :key="b.id">
			<td>{{ b.title }}</td>
		</tr>
		</tbody>
	</table>

	<BlockModal />
</template>

<style scoped></style>