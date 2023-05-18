import {Tnk} from "./Tnk";
import { ITnkEventRepository } from './Repository/event/ITnkEventRepository';


export function tnkFactory(eventRepository: ITnkEventRepository): Tnk {
    return new Tnk(eventRepository);
}