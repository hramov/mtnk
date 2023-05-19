<script setup lang="ts">

import { ref } from 'vue';
import ProfileModal from '../../components/admin/ProfileModal.vue';
import { openModal } from '../../../helpers/modal.helper';

const profiles = ref([
	{
		id: 1,
		block: {
			id: 1,
			title: 'Технологический'
		},
		dept: {
			id: 1,
			block: {
				id: 1,
				title: 'Технологический'
			},
			title: 'УПП'
		},
		title: 'Создатель ТНК ЦТС УПП',
		role: {
			id: 1,
			title: 'Создатель ТНК'
		}
	},
])
const createProfile = () => {
	openModal('profileModal')
}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Список профилей</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='createProfile'>
				Создать
			</button>
		</div>
	</div>

	<table class="table table-hover">
		<thead>
		<tr>
			<th scope="col">Название</th>
			<th scope="col">Блок</th>
			<th scope="col">Подразделение</th>
			<th scope="col">Роль</th>
		</tr>
		</thead>
		<tbody>
		<tr class='clickable' v-for="p in profiles" :key="p.id">
			<td>{{ p.title }}</td>
			<td>{{ p.block.title }}</td>
			<td>{{ p.dept.title }}</td>
			<td>{{ p.role.title }}</td>
		</tr>
		</tbody>
	</table>

	<ProfileModal />
</template>

<style scoped></style>