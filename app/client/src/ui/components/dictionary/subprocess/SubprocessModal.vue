<script setup lang="ts">
import { Process } from '../../../../../../shared/tnk';
import { closeModal } from '../../../../helpers/modal.helper';
import { useToast } from '../../../../helpers/toast.helper';
import { DictionaryService } from '../../../../api/dictionary';
import { onMounted, ref, toRaw } from 'vue';
import { Filters } from '../../../../config/config';
import Autocomplete from '../../form/Autocomplete.vue';

const dictionaryService = new DictionaryService();
const props = defineProps(['subprocess']);
const emit = defineEmits(['save', 'close']);
const isLoaded = ref<boolean>(false);

const autoCompleteItems = ref<Array<Process>>([]);
const currentProcess = ref<string>();
const subprocessToEdit = ref<any>({});
const itsmProcess = ref<any>([]);

const save = () => {
	emit('save', toRaw(subprocessToEdit.value));
	closeModal('subprocessModal');
	useToast('success', 'Успешно', 'Подпроцесс успешно сохранен!')
}

const typeahead = async (title: string) => {
	const filter: Filters<Process> = {
		title: title,
	}
	autoCompleteItems.value = await dictionaryService.getProcessList(filter);
}

const chosen = (process: Process) => {
	subprocessToEdit.value.processId = process.id;
}

onMounted(async () => {

	itsmProcess.value = await dictionaryService.getItsmProcess();

	if (props.subprocess.processId) {
		const result = await dictionaryService.getProcessList({
			id: props.subprocess.processId,
		});
		if (result && result[0]) {
			currentProcess.value = result[0].title;
		}
	}

	subprocessToEdit.value = Object.assign({}, {
		id: props.subprocess.id,
		title: props.subprocess.title,
		code: props.subprocess.code,
		itsmProcessId: props.subprocess?.itsmProcess?.id,
		isActive: props.subprocess.isActive,
		processId: props.subprocess.processId,
		esppObject: props.subprocess.esppObject,
	})
	isLoaded.value = true;
});
</script>

<template>
	<div class="modal fade" id="subprocessModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="subprocessModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="subprocessModalLabel">{{subprocessToEdit.title || 'Добавить подпроцесс'}}</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="emit('close')"></button>
				</div>
				<div class="modal-body">
					<form>
						<div class="mb-3">
							<label for="exampleInputEmail1" class="form-label">Процесс</label>
							<Autocomplete :items='autoCompleteItems' @typeahead='typeahead' @chosen='chosen' :value='currentProcess' v-if='isLoaded'/>
							<div id="emailHelp" class="form-text">Начните вводить название процесса</div>
						</div>
						<div class="mb-3">
							<label for="exampleInputEmail1" class="form-label">Название</label>
							<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='subprocessToEdit.title'>
						</div>
						<div class="mb-3">
							<label for="exampleInputPassword1" class="form-label">Идентификатор</label>
							<input type="text" class="form-control" id="exampleInputPassword1" v-model='subprocessToEdit.code'>
						</div>
						<div class="mb-3">
							<label for="exampleInputPassword1" class="form-label">ITSM процесс</label>
							<select class="form-select" aria-label="Default select example" v-model='subprocessToEdit.itsmProcessId'>
								<option v-for='p in itsmProcess' :value="p.id">{{ p.title }}</option>
							</select>
						</div>
						<div class="mb-3 form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model='subprocessToEdit.isActive'>
							<label class="form-check-label" for="exampleCheck1">Активен</label>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click="save">Сохранить</button>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('close')">Закрыть</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>