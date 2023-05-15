import {Operation} from "../ValueObject/Operation";

export interface OperationAddedEvent {
    tnkId: number;
    operation: Operation
    date: Date;
}