export class ApproverIsAlreadyInListError extends Error {
	constructor() {
		super('Approver is already in list');
	}
}