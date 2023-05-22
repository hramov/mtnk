<script setup lang="ts">
import { ReferenceOperation } from '../../../../../../shared/tnk';
import { closeModal } from '../../../../helpers/modal.helper';
import { useToast } from '../../../../helpers/toast.helper';
import Modal from '../../layout/Modal.vue';

const props = defineProps<{operation: ReferenceOperation}>();
const emit = defineEmits(['save'])

const save = () => {
	console.log(props.operation)
	emit('save');
	closeModal('operationModal');
	useToast('success', 'Успешно', 'Операция успешно сохранена!')
}
</script>

<template>

	<Modal id="operationModal">
		<template v-slot:header>
			<h5 class="modal-title" id="operationModalLabel">{{operation.title || 'Добавить Операцию'}}</h5>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</template>

		<template v-slot:body>
			<form>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Название</label>
					<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='operation.title'>
				</div>

				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Длительность (в минутах)</label>
					<input type="number" min="0" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='operation.title'>
				</div>

				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">Измеритель</label>
					<select class="form-select" aria-label="Default select example" v-model='operation.unit'>
						<option v-for='p in itsmProcess' :value="p.id">{{ p.title }}</option>
					</select>
				</div>

				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">Тип операции</label>
					<select class="form-select" aria-label="Default select example" v-model='operation.source'>
						<option>123</option>
					</select>
				</div>

				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Номер</label>
					<input type="number" min="1" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='operation.title'>
				</div>

				<div class="mb-3 form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model='operation.isActive'>
					<label class="form-check-label" for="exampleCheck1">Активна</label>
				</div>
			</form>
		</template>

		<template v-slot:footer>
			<button type="button" class="btn btn-primary" @click="save">Сохранить</button>
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
		</template>
	</Modal>
</template>

<style></style>