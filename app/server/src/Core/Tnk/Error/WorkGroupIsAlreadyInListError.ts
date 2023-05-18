export class WorkGroupIsAlreadyInListError extends Error {
	constructor() {
		super('Workgroup in already in list');
	}
}