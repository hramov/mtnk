export class ApprovingQueueIsEmptyError extends Error {
	constructor() {
		super('Approving queue is empty');
	}
}