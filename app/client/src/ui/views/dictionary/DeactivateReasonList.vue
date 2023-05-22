<script setup lang="ts">
import Alert from './../../components/layout/Alert.vue';

import { ref } from 'vue';
import { openModal } from '../../../helpers/modal.helper';
import DeactivateReasonModal from '../../components/dictionary/tnk/DeactivateReasonModal.vue';

const reasons = ref<any>([])
const openReason = (assignee: any) => {
	openModal('deactivateReasonModal');
}

const save = () => {}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Причина деактивации</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='openReason({})'>
				Добавить
			</button>
		</div>
	</div>

	<table class="table table-hover" v-if='reasons.length > 0'>
		<thead>
		<tr>
			<th scope="col">Идентификатор</th>
			<th scope="col">Название</th>
			<th scope="col">Порядковый номер</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for='r in reasons' :key='r.id' class='clickable' @click='openReason(r)'>
			<td>{{ r.id }}</td>
			<td>{{ r.title }}</td>
			<td>{{ r.docNum }}</td>
		</tr>
		</tbody>
	</table>
	<Alert v-else type='warning' message='Нет данных'/>

	<DeactivateReasonModal :reason='{}' :key='1' @save='save' @close='close'/>

	<!--	<Filters @filters="applyFilters"/>-->

</template>

<style></style>