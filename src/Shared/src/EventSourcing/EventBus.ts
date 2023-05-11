import { EventEmitter } from 'stream';
import { ICommand } from './ICommand';
import { Event } from './Event';

export class EventBus extends EventEmitter {
	constructor() {
		super();
	}

	// sendCommand(command: ICommand) {
	// 	this.emit(command.data);
	// }
	//
	// listenTo<T>(event: Event<T>) {
	// 	return this.on(event.name, (data) => {
	// 		event.cb(data);
	// 	});
	// }
}
