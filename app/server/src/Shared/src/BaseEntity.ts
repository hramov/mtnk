import {Uuid} from "./ValueObject/Objects/Uuid";

export abstract class BaseEntity<T> {
    public id: T
    public dateCreated: Date;
    public lastUpdated: Date;
    public lastUpdatedBy: Uuid;
}
