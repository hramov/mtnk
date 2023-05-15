import {Tnk} from "../Tnk";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";

export interface TnkCreatedEvent {
    tnkId: Uuid;
    tnk: Tnk
    date: Date;
}