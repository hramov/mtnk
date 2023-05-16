import {Tnk} from "./Tnk";
import {EventPublisher} from "../../Shared/src/EventSourcing/EventPublisher";
import {IEventBus} from "../IEventBus";
import {ILogger} from "../ICore";


export function tnkFactory(logger: ILogger, eventBus: IEventBus): Tnk {
    const eventPublisher = new EventPublisher(logger, eventBus);
    return new Tnk(eventPublisher);
}