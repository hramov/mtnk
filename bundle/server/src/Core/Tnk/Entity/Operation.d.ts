import { BaseEntity } from "../../../Shared/src/BaseEntity";
import { ReferenceOperation } from "./ReferenceOperation";
import { Amount } from "../ValueObject/Amount";
export declare class Operation extends BaseEntity<number> {
    private _tnkId;
    private _referenceOperation;
    private _amount;
    private _title;
    private _isActive;
    private _sortOrder;
    private _assignee;
    get tnkId(): number;
    set tnkId(value: number);
    get referenceOperation(): ReferenceOperation;
    set referenceOperation(value: ReferenceOperation);
    get amount(): Amount;
    set amount(value: Amount);
    get title(): string;
    set title(value: string);
    get isActive(): boolean;
    set isActive(value: boolean);
    get sortOrder(): number;
    set sortOrder(value: number);
    get assignee(): string;
    set assignee(value: string);
}
