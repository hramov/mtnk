<script setup lang="ts">
const props = defineProps(['modalId', 'size'])
</script>

<template>
	<div class="modal fade" :id="modalId" data-bs-backdrop="static" tabindex="-1" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
		<div class="modal-dialog" :class="'modal-' + size">
			<div class="modal-content">
				<div class="modal-header">
					<slot name="header"></slot>
				</div>
				<div class="modal-body">
					<slot name="body"></slot>
				</div>
				<div class="modal-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>