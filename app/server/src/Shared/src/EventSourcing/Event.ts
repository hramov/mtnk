export class Event<T> {
	constructor(public cb: Function) {
		this.cb = cb;
	}
}
