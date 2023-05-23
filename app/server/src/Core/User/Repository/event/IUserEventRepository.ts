import { IBaseRepository } from '../../../../Shared/src/IBaseRepository';
import { DatabaseError } from '../../../Error/Database.error';
import { UserCreated } from '../../Events/UserCreated';
import { UserConstructor } from '../../User';
import { UserSearchParams } from '../../ValueObject/UserSearchParams';
import { UserUpdated } from '../../Events/UserUpdated';
import { UserPasswordChanged } from '../../Events/UserPasswordChanged';

export type UserEvent = UserCreated | UserUpdated | UserPasswordChanged

export interface IUserEventRepository extends IBaseRepository {
	writeEvent(event: UserEvent);
	writeEvents(events: UserEvent[]);
	get(searchParams: UserSearchParams): Promise<UserConstructor[] | DatabaseError>;
	getByAggregateId(aggregateId: string): Promise<UserConstructor | DatabaseError>;
}