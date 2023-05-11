import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {ReferenceOperation} from "./ReferenceOperation";
import {Amount} from "../ValueObject/Amount";

export class Operation extends BaseEntity<number> {
    private tnkId: number;
    private referenceOperation: ReferenceOperation;
    private amount: Amount;
    private title: string;
    private isActive: boolean;
    private sortOrder: number;
    private assignee: string;
}