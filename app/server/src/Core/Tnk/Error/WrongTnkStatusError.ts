export class WrongTnkStatusError extends Error {
	static createErrorMessage(status: string, shouldBe: Array<string>): string {
		return `Некорректный статус ТНК для обновления: ${status}, а должен быть ${shouldBe.join(' или ')}`;
	}
	constructor(status: string, shouldBe: Array<string>) {
		super(WrongTnkStatusError.createErrorMessage(status, shouldBe));
	}
}