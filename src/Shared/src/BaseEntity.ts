import {DateTime} from "./ValueObject/Objects/DateTime";
import {Uuid} from "./ValueObject/Objects/Uuid";

export abstract class BaseEntity<T> {
    protected id: T
    protected dateCreated: DateTime;
    protected lastUpdated: DateTime;
    protected lastUpdatedBy: Uuid;
}
