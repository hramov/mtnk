<script setup lang="ts">
import Modal from '../layout/Modal.vue';
import Autocomplete from './../form/Autocomplete.vue';
import { Process, Subprocess } from '../../../../../shared/tnk';

import { computed, reactive, ref, toRaw } from 'vue';
import { closeModal } from '../../../helpers/modal.helper';
import { Filters } from '../../../config/config';
import { DictionaryService } from '../../../api/dictionary';
import { useToast } from '../../../helpers/toast.helper';
import { TnkService } from '../../../api/tnk';

const emit = defineEmits(['save', 'close']);

const tnkService = new TnkService();
const dictionaryService = new DictionaryService();
const isLoaded = ref(false);

const processItems = ref<Process[]>([]);
const currentProcess = ref<string>('');
const processTypeahead = async (title: string) => {
	const filter: Filters<Process> = {
		title: title,
	}
	processItems.value = await dictionaryService.getProcessList(filter);
};
const processChosen = (process: Process) => {
	currentProcess.value = process.title;
	model.process = process;
};

const subprocessItems = ref<Subprocess[]>([]);
const currentSubprocess = ref<string>('');
const subprocessTypeahead = async (title: string) => {
	const filter: Filters<Subprocess> = {
		title: title,
	}
	subprocessItems.value = await dictionaryService.getSubprocessList(filter);
};
const subprocessChosen = (subprocess: Subprocess) => {
	currentSubprocess.value = subprocess.title;
	model.subprocess = subprocess;
};

const model = reactive<any>({
	title: null,
	process: null,
	subprocess: null,
	isAutomated: null,
	type: null,
});

const clearModel = () => {
	model.title = null;
	model.process = null;
	model.subprocess = null;
	model.isAutomated = null;
	model.type = null;

	currentProcess.value = '';
	currentSubprocess.value = '';
}

const save = async () => {
	const result = await tnkService.saveTnk(toRaw(model));
	console.log(result);
	if (result) {
		emit('save');
		closeModal('tnkModal');
		useToast('success', 'Успешно', 'ТНК успешно сохранена!');
	}
}

const close = () => {
	clearModel();
	emit('close');
}

const isSaveDisabled = computed(() => {
	return Object.values(model).filter((item: any) => item).length !== Object.keys(model).length;
})
</script>

<template>
	<Modal id='tnkModal' size='lg'>
		<template v-slot:header>
			<h5 class="modal-title" id="subprocessModalLabel">Добавить ТНК технологического блока<div class="form-text">Для сохранения ТНК заполните все поля</div></h5>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</template>

		<template v-slot:body>
			<form>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Название</label>
					<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='model.title'>
				</div>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Процесс</label>
					<Autocomplete :items='processItems' @typeahead='processTypeahead' @chosen='processChosen' :value='currentProcess' :key='currentProcess'/>
					<div id="emailHelp" class="form-text">Начните вводить название процесса</div>
				</div>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Подпроцесс</label>
					<Autocomplete :items='subprocessItems' @typeahead='subprocessTypeahead' @chosen='subprocessChosen' :value='currentSubprocess' :key='currentSubprocess'/>
					<div id="emailHelp" class="form-text">Начните вводить название подпроцесса</div>
				</div>
				<div style='display: flex; width: 100%; justify-content: space-between'>
					<div class="mb-3" style='width: 49%'>
						<label for="exampleInputPassword1" class="form-label">Автоматизация</label>
						<select class="form-select" aria-label="Default select example" v-model='model.isAutomated'>
							<option value="да">Да</option>
							<option value="нет">Нет</option>
						</select>
					</div>
					<div class="mb-3" style='width: 49%'>
						<label for="exampleInputPassword1" class="form-label">Вид ТНК</label>
						<select class="form-select" aria-label="Default select example" v-model='model.type'>
							<option value="общий">Общий</option>
						</select>
					</div>
				</div>
			</form>
		</template>

		<template v-slot:footer>
			<button type="button" class="btn btn-primary" @click='save' :disabled='isSaveDisabled'>Сохранить</button>
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Закрыть</button>
		</template>
	</Modal>
</template>

<style></style>