<script setup lang="ts">

import { ref } from 'vue';
import UserModal from '../../components/admin/UserModal.vue';
import { openModal } from '../../../helpers/modal.helper';

const users = ref([
	{
		id: 1,
		fio: 'Храмов Сергей Иванович',
		email: 'trykhramov@gmail.com',
		profile: {
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
		}
	},
])
const createUser = () => {
	openModal('userModal')
}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Список пользователей</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='createUser'>
				Создать
			</button>
		</div>
	</div>

	<table class="table table-hover">
		<thead>
		<tr>
			<th scope="col">ФИО</th>
			<th scope="col">Email</th>
			<th scope="col">Профиль</th>
		</tr>
		</thead>
		<tbody>
		<tr class='clickable' v-for="u in users" :key="u.id">
			<td>{{ u.fio }}</td>
			<td>{{ u.email }}</td>
			<td>{{ u.profile.title }}</td>
		</tr>
		</tbody>
	</table>

	<UserModal />
</template>

<style scoped></style>