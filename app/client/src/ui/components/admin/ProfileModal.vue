<script setup lang="ts">
import Modal from './../layout/Modal.vue';
</script>

<template>
	<Modal id='profileModal'>
		<template v-slot:header>

		</template>

		<template v-slot:body>

		</template>

		<template v-slot:footer>
			<button type="button" class="btn btn-primary">Сохранить</button>
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
		</template>
	</Modal>
</template>

<style scoped></style>