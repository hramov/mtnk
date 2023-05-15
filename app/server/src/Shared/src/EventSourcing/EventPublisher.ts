import {IEventPublisher} from "./IEventPublisher";
import {IEventBus} from "../../../Core/IEventBus";

export class EventPublisher implements IEventPublisher {

    constructor(private readonly eventBus: IEventBus) {}

    publish<T>(customEvent: T): Promise<void> {
        return null;
    }

}