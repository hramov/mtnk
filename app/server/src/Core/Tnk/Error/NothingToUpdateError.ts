export class NothingToUpdateError extends Error {
	constructor() {
		super('Nothing to update');
	}
}