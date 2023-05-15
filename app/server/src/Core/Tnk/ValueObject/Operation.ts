import {Amount} from "./Amount";
import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export type Assignee = 'сотрудник | чат-бот | робот';
export type OperationConstructor = {
    tnkId: number;
    referenceOperationId: number;
    amount: Amount;
    title: string;
    isActive: boolean;
    sortOrder: number;
    assignee: Assignee;
};

export class Operation extends ValueObject {
    private readonly tnkId: number;
    private readonly referenceOperationId: number;
    private readonly amount: Amount;
    private readonly title: string;
    private readonly sortOrder: number;
    private readonly assignee: Assignee;

    constructor(operation: OperationConstructor) {
        super()
        this.tnkId = operation.tnkId;
        this.referenceOperationId = operation.referenceOperationId;
        this.amount = operation.amount;
        this.title = operation.title;
        this.sortOrder = operation.sortOrder;
        this.assignee = operation.assignee;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.tnkId;
        yield this.referenceOperationId;
        yield this.amount;
        yield this.title;
        yield this.sortOrder;
        yield this.assignee;
    }
}