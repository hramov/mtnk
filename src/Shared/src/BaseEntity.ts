import { BaseDomainEvent } from './BaseDomainEvent';

export abstract class BaseEntity<T> {
	public id: T;
	public events: BaseDomainEvent[];
}
