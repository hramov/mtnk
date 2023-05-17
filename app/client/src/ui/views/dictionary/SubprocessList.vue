<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { Subprocess } from '../../../../../shared/tnk';
import { DictionaryService } from '../../../api/dictionary';
import { openModal } from '../../../helpers/modal.helper';
import SubprocessModal from '../../components/dictionary/subprocess/SubprocessModal.vue';
import Alert from '../../components/layout/Alert.vue';

const dictionaryService = new DictionaryService();

const subprocess = ref<Array<Subprocess>>([]);

onMounted(async () => {
	subprocess.value = await dictionaryService.getSubprocessList({});
});

const subprocessToEdit = ref<Subprocess>({} as Subprocess);

const openSubprocess = (subprocess: Subprocess) => {
	subprocessToEdit.value = Object.assign({}, subprocess);
	openModal('subprocessModal');
}

const save = async () => {
	await dictionaryService.saveSubprocess(toRaw<Subprocess>(subprocessToEdit.value as Subprocess));
	subprocess.value = await dictionaryService.getSubprocessList({});
}

const close = () => {
	subprocessToEdit.value = {} as Subprocess;
}

</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h2">Список подпроцессов</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<div class="btn-group me-2">
				<button type="button" class="btn btn-sm btn-success">Excel</button>
			</div>
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
				<span data-feather="calendar"></span>
				Фильтры
			</button>
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='openSubprocess({})'>
				Добавить
			</button>
		</div>
	</div>

	<table class="table table-hover" v-if='subprocess.length > 0'>
		<thead>
		<tr>
			<th scope="col">Название</th>
			<th scope="col">ITSM процесс</th>
			<th scope="col">Идентификатор</th>
			<th scope="col">Активность</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for='s in subprocess' :key='s.id' class='clickable' @click='openSubprocess(s)'>
			<td>{{ s.title }}</td>
			<td>{{ s.itsmProcess.title }}</td>
			<td>{{ s.code }}</td>
			<td>{{ s.isActive ? 'да' : 'нет' }}</td>
		</tr>
		</tbody>
	</table>
	<Alert v-else type='warning' message='Нет данных'/>

	<SubprocessModal :subprocess='subprocessToEdit' :key='subprocessToEdit.id' @save='save' @close='close'/>
</template>

<style></style>