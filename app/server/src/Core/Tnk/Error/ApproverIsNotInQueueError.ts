export class ApproverIsNotInQueueError extends Error {
	constructor() {
		super('Approver is not in queue');
	}
}