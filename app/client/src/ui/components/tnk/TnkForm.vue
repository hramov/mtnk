<script setup lang="ts">
import { Process, Subprocess} from './../../../../../shared/tnk';
import Autocomplete from './../form/Autocomplete.vue';
import Timeline from './../layout/Timeline.vue';
import { onMounted, reactive, ref, toRaw } from 'vue';
import { DictionaryService } from '../../../api/dictionary';
import { TnkService } from '../../../api/tnk';
import { useToast } from '../../../helpers/toast.helper';
const props = defineProps(['tnk']);
const emit = defineEmits(['update']);
const dictionaryService = new DictionaryService();
const tnkService = new TnkService();

const tnkTypes = ref<{id: number, title: string}[]>([]);

const currentProcess = ref(props.tnk.process.title);
const processItems = ref<Process>();
const typeaheadProcess = () => {}
const chosenProcess = () => {}

const currentSubprocess = ref(props.tnk.subprocess.title);
const subprocessItems = ref<Subprocess>();
const typeaheadSubprocess = () => {}
const chosenSubprocess = () => {}

const model = reactive({
	id: props.tnk.tnkId,
	title: props.tnk.title,
	process: props.tnk.process,
	subprocess: props.tnk.subprocess,
	isActive: props.tnk.isActive,
	isDigital: props.tnk.isDigital,
	isAutomated: props.tnk.isAutomated,
	type: props.tnk.type,
	status: props.tnk.status,
});

onMounted(async () => {
	tnkTypes.value = await dictionaryService.getTnkTypes();
});

const save = async () => {
	const result = await tnkService.saveTnk(toRaw(model));
	if (result) {
		emit('update');
		return useToast('success', 'Успешно', 'ТНК успешно сохранена');
	}
	return useToast('error', 'Ошибка', 'Ошибка сохранения ТНК');
}

const moveToApproving = async () => {
	const result = await tnkService.moveToApproving(props.tnk.tnkId);
	if (result) {
		emit('update');
		return useToast('success', 'Успешно', 'ТНК отправлена на согласование');
	}
	return useToast('error', 'Ошибка', 'Ошибка отправки на согласование');
}

const approve = async () => {
	const result = await tnkService.approve(props.tnk.tnkId);
	if (result) {
		emit('update');
		return useToast('success', 'Успешно', 'Вы согласовали ТНК');
	}
	return useToast('error', 'Ошибка', 'Ошибка согласования');
}

const decline = async () => {
	const result = await tnkService.decline(props.tnk.tnkId);
	if (result) {
		emit('update');
		return useToast('success', 'Успешно', 'Вы отклонили ТНК');
	}
	return useToast('error', 'Ошибка', 'Ошибка отклонения');
}

const moveToConfirming = () => {
	console.log(5);
}
</script>

<template>
  <div class="tnk-form">
    <form @submit.prevent>
		<div class="mb-3 half-width">
			<label class="form-label" for="floatingPassword">Статус</label>
			<select class="form-select" disabled>
				<option>{{ model.status.title }}</option>
			</select>
		</div>

      <div class="mb-3">
		<label class="form-label" for="floatingInput">Название</label>
        <input type="text" class="form-control" placeholder="Название ТНК" v-model="model.title">
      </div>
      <div class="mb-3">
		  <label class="form-label" for="floatingPassword">Процесс</label>
		  <Autocomplete :items='processItems' @typeahead='typeaheadProcess' @chosen='chosenProcess' :value='currentProcess' />
      </div>

      <div class="mb-3">
		  <label class="form-label" for="floatingPassword">Подпроцесс</label>
		  <Autocomplete :items='subprocessItems' @typeahead='typeaheadSubprocess' @chosen='chosenSubprocess' :value='currentSubprocess' />
      </div>

		<div class="mb-3 form-check">
			<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model='model.isActive'>
			<label class="form-check-label" for="exampleCheck1">Активна</label>
		</div>

		<div class="mb-3 form-check">
			<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model='model.isDigital'>
			<label class="form-check-label" for="exampleCheck1">Реализуемость ЦС</label>
		</div>

		<div class="mb-3 form-check">
			<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model='model.isAutomated'>
			<label class="form-check-label" for="exampleCheck1">Автоматизация</label>
		</div>

		<div class="mb-3 half-width">
			<label class="form-label" for="floatingPassword">Вид ТНК</label>
			<select class="form-select" aria-label="Default select example" v-model='model.type'>
				<option v-for='t in tnkTypes' :key="t.id" :value="t">{{ t.title }}</option>
			</select>
		</div>

		<div class="action-buttons">
			<button class="btn btn-primary" @click='save'>Сохранить</button>
			<button class="btn btn-secondary" @click='moveToApproving'>На согласование</button>
			<button class="btn btn-success" @click='approve'>Согласовать</button>
			<button class="btn btn-danger" @click='decline'>Отклонить</button>
			<button class="btn btn-warning" @click='moveToConfirming'>На утверждение</button>
		</div>
    </form>

    <div>
      <Timeline :timelines="props.tnk.timeline"/>
    </div>
  </div>
</template>

<style scoped>

.half-width {
	width: 50%
}

.tnk-form {
  display: flex;
  justify-content: space-between;
}

.tnk-form > form {
  width: 60%;
}
.tnk-form > div {
  width: 35%;
}

 .action-buttons {
	 display: flex;
	 justify-content: center;
	 margin-top: 30px;
 }

.action-buttons > * {
	margin-left: 10px;
}
</style>