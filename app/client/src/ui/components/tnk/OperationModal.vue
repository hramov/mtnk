<script setup lang="ts">
import Modal from '../layout/Modal.vue';
import Autocomplete from './../form/Autocomplete.vue';
import { computed, ref } from 'vue';

const current = ref('');
const items = ref([]);
const typeahead = () => {}
const chosen = () => {}

const save = () => {}
const isSaveDisabled = computed(() => {

});

const close = () => {}
</script>

<template>
	<Modal id='operationModal'>
		<template v-slot:header>
			<h5 class="modal-title" id="subprocessModalLabel">Добавить операцию</h5>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</template>
		<template v-slot:body>
			<form>
				<div class="mb-3">
					<label class="form-label" for="floatingInput">Название</label>
					<input type="text" class="form-control" placeholder="Название ТНК">
				</div>
				<div class="mb-3">
					<label class="form-label" for="floatingPassword">Процесс</label>
					<Autocomplete :items='items' @typeahead='typeahead' @chosen='chosen' :value='current' />
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