import {Tnk} from "./Tnk";
import {EventPublisher} from "../../Shared/src/EventSourcing/EventPublisher";
import {IEventBus} from "../IEventBus";


export function tnkFactory(eventBus: IEventBus): Tnk {
    const eventPublisher = new EventPublisher(eventBus);
    return new Tnk(eventPublisher);
}