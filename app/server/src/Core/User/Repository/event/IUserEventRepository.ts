import { IBaseRepository } from '../../../../Shared/src/IBaseRepository';
import { DatabaseError } from '../../../Error/Database.error';
import { UserCreated } from '../../Events/UserCreated';
import { UserConstructor } from '../../User';
import { UserSearchParams } from '../../ValueObject/UserSearchParams';

export type UserEvent = UserCreated

export interface IUserEventRepository extends IBaseRepository {
	writeEvent(event: UserEvent);
	writeEvents(events: UserEvent[]);
	get(searchParams: UserSearchParams): Promise<UserConstructor[] | DatabaseError>;
	getByAggregateId(aggregateId: string): Promise<UserConstructor | DatabaseError>;
}