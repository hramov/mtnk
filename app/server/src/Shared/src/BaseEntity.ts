import {DateTime} from "./ValueObject/Objects/DateTime";
import {Uuid} from "./ValueObject/Objects/Uuid";

export abstract class BaseEntity<T> {
    set id(val: T) {
        this._id = val
    }

    get id(): T {
        return this._id
    }

    protected _id: T
    protected dateCreated: DateTime;
    protected lastUpdated: DateTime;
    protected lastUpdatedBy: Uuid;
}
