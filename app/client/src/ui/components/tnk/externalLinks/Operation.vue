<script setup lang="ts">
import { ReferenceOperation} from '../../../../../../shared/tnk';
import OperationModal from '../OperationModal.vue';
import { openModal } from '../../../../helpers/modal.helper';

const props = defineProps(['operations']);

const editOperation = (operation: ReferenceOperation) => {
	openModal('operationModal')
}
const calcSum = () => {
  if (props.operations) {
    return props.operations.reduce((acc: number, item: any) => acc += item.amount * item.duration, 0)
  }
}
</script>

<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
		<h1 class="h4">Операции</h1>
		<div class="btn-toolbar mb-2 mb-md-0">
			<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='editOperation({})'>
				Добавить
			</button>
		</div>
	</div>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Номер</th>
      <th scope="col">Операция по процессу ОД</th>
      <th scope="col">Измеритель</th>
      <th scope="col">Операция ЦОТЭН</th>
      <th scope="col">Длительность</th>
      <th scope="col">Количество</th>
      <th scope="col">Итого</th>
      <th scope="col">Исполнитель</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="o in props.operations" :key="o.id" class='clickable' @click='editOperation(o)'>
      <td>{{ o.id }}</td>
      <td>{{ o.title }}</td>
    </tr>
    </tbody>
  </table>
	<OperationModal />
</template>

<style></style>