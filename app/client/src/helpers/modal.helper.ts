import { nextTick } from 'vue';
declare var bootstrap: any;

export function openModal(id: string) {
	nextTick(() => {
		const modal = new bootstrap.Modal(document.getElementById(id))
		modal.show();
	});
}

export function closeModal(id: string) {
	const modal = bootstrap.Modal.getInstance(document.getElementById(id))
	modal.hide();
}