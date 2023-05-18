export class ConfigItemIsAlreadyInListError extends Error {
	constructor() {
		super('Configuration item in already in list');
	}
}