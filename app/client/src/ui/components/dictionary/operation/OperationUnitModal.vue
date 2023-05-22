<script setup lang="ts">
import { closeModal } from '../../../../helpers/modal.helper';
import { useToast } from '../../../../helpers/toast.helper';
import Modal from '../../layout/Modal.vue';

const props = defineProps<{unit: any}>();
const emit = defineEmits(['save'])

const save = () => {
	emit('save');
	closeModal('operationUnitModal');
	useToast('success', 'Успешно', 'Исполнитель успешно сохранен!')
}
</script>

<template>

	<Modal id="operationUnitModal">
		<template v-slot:header>
			<h5 class="modal-title" id="operationUnitModalLabel">{{unit.title || 'Добавить единицу измерения операции'}}</h5>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</template>

		<template v-slot:body>
			<form>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Название</label>
					<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='unit.title'>
				</div>

				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Порядковый номер</label>
					<input type="number" min="0" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='unit.docNum'>
				</div>

				<div class="mb-3 form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model='unit.isActive'>
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