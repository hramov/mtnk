<script setup lang="ts">
import { Process } from '../../../../../../shared/tnk';
import { closeModal } from '../../../../helpers/modal.helper';
import { useToast } from '../../../../helpers/toast.helper';

const props = defineProps<{process: Process}>();
const emit = defineEmits(['save'])

const save = () => {
	console.log(props.process)
	emit('save');
	closeModal('processModal');
	useToast('success', 'Успешно', 'Процесс успешно сохранен!')
}
</script>

<template>
	<div class="modal fade" id="processModal" tabindex="-1" aria-labelledby="processModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="processModalLabel">{{process.title || 'Добавить процесс'}}</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
						<div class="mb-3">
							<label for="exampleInputEmail1" class="form-label">Название</label>
							<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model='process.title'>
						</div>
						<div class="mb-3">
							<label for="exampleInputPassword1" class="form-label">Идентификатор</label>
							<input type="text" class="form-control" id="exampleInputPassword1" v-model='process.code'>
						</div>
						<div class="mb-3 form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1" :disabled='!process.canBeDeactivated' v-model='process.isActive'>
							<label class="form-check-label" for="exampleCheck1">Активен</label>
							<div id="emailHelp" class="form-text">Деактивировать процесс можно только тогда, когда все его процессы не активны</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click="save">Сохранить</button>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>