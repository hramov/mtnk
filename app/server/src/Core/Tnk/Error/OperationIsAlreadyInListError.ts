export class OperationIsAlreadyInListError extends Error {
	constructor() {
		super('Operation in already in list');
	}
}