<script setup lang="ts">
import { Process, Subprocess} from './../../../../../shared/tnk';
import Autocomplete from './../form/Autocomplete.vue';
import Timeline from './../layout/Timeline.vue';
import { onMounted, reactive, ref } from 'vue';
import { DictionaryService } from '../../../api/dictionary';
const props = defineProps(['tnk']);

const dictionaryService = new DictionaryService();
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
	title: props.tnk.title,
	processId: props.tnk.process.id,
	subprocess: props.tnk.subprocess.id,
	isActive: props.tnk.isActive,
	isDigital: props.tnk.isDigital,
	isAutomated: props.tnk.isAutomated,
});

onMounted(async () => {
	tnkTypes.value = await dictionaryService.getTnkTypes();
})
</script>

<template>
  <div class="tnk-form">
    <form>
		<div class="mb-3 half-width">
			<label class="form-label" for="floatingPassword">Статус</label>
			<select class="form-select" disabled>
				<option>{{ props.tnk.status.title }}</option>
			</select>
		</div>

      <div class="mb-3">
		<label class="form-label" for="floatingInput">Название</label>
        <input type="text" class="form-control" placeholder="Название ТНК" v-model="tnk.title">
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
			<select class="form-select" aria-label="Default select example">
				<option v-for='t in tnkTypes' :key="t.id" :value="t.id">{{ t.title }}</option>
			</select>
		</div>

		<div class="action-buttons">
			<button class="btn btn-success">Сохранить</button>
			<button class="btn btn-warning">Сбросить</button>
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