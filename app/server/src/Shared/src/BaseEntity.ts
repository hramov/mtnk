import {DateTime} from "./ValueObject/Objects/DateTime";
import {Uuid} from "./ValueObject/Objects/Uuid";

export abstract class BaseEntity<T> {
    public id: T
    public dateCreated: DateTime;
    public lastUpdated: DateTime;
    public lastUpdatedBy: Uuid;
}
