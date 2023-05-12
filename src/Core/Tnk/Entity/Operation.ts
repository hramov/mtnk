import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {ReferenceOperation} from "./ReferenceOperation";
import {Amount} from "../ValueObject/Amount";

export class Operation extends BaseEntity<number> {
    private _tnkId: number;
    private _referenceOperation: ReferenceOperation;
    private _amount: Amount;
    private _title: string;
    private _isActive: boolean;
    private _sortOrder: number;
    private _assignee: string;

    get tnkId(): number {
        return this._tnkId;
    }

    set tnkId(value: number) {
        this._tnkId = value;
    }

    get referenceOperation(): ReferenceOperation {
        return this._referenceOperation;
    }

    set referenceOperation(value: ReferenceOperation) {
        this._referenceOperation = value;
    }

    get amount(): Amount {
        return this._amount;
    }

    set amount(value: Amount) {
        this._amount = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }

    get sortOrder(): number {
        return this._sortOrder;
    }

    set sortOrder(value: number) {
        this._sortOrder = value;
    }

    get assignee(): string {
        return this._assignee;
    }

    set assignee(value: string) {
        this._assignee = value;
    }
}