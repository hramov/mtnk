import {Amount} from "../../../../../Core/Tnk/ValueObject/Amount";
import {Assignee} from "../../../../../Core/Tnk/ValueObject/Operation";

export class OperationDto {
    tnkId: number;
    referenceOperationId: number;
    amount: number;
    title: string;
    isActive: boolean;
    sortOrder: number;
    assignee: Assignee;
}