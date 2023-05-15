import {IEventPublisher} from "./IEventPublisher";
import {IEventBus} from "../../../Core/IEventBus";

export class EventPublisher implements IEventPublisher {

    constructor(private readonly eventBus: IEventBus) {}

    publish<T>(eventName: string, customEvent: T): Promise<void> {
        this.eventBus.emit(eventName, customEvent);
        return;
    }

}