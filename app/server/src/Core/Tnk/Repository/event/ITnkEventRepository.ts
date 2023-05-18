import { IBaseRepository } from '../../../../Shared/src/IBaseRepository';
import { TnkCreated } from '../../Events/TnkCreated';
import { TnkUpdated } from '../../Events/TnkUpdated';
import { ConfigItemAdded } from '../../Events/ConfigItemAdded';
import { WorkGroupAdded } from '../../Events/WorkGroupAdded';
import { OperationAdded } from '../../Events/OperationAdded';
import { TnkApprovedByApprover } from '../../Events/TnkApprovedByApprover';
import { TnkApproved } from '../../Events/TnkApproved';
import { TnkDeclinedByApprover } from '../../Events/TnkDeclinedByApprover';
import { TnkSearchParams } from '../../ValueObject/TnkSearchParams';
import { TnkConstructor } from '../../Tnk';
import { DatabaseError } from '../../../Error/Database.error';
import { ApprovingGroupChanged } from '../../Events/ApprovingGroupChanged';

export type TnkEvents = TnkCreated | TnkUpdated | ConfigItemAdded | WorkGroupAdded | OperationAdded | TnkApprovedByApprover | TnkApproved | TnkDeclinedByApprover | ApprovingGroupChanged;

export interface ITnkEventRepository extends IBaseRepository {
	writeEvent(event: TnkEvents);
	writeEvents(events: TnkEvents[]);
	get(searchParams: TnkSearchParams): Promise<TnkConstructor[] | DatabaseError>;
	getByAggregateId(aggregateId: string): Promise<TnkConstructor | DatabaseError>;
}