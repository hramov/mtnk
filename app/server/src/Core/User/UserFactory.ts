import { IUserEventRepository } from './Repository/event/IUserEventRepository';
import { User } from './User';

export function userFactory(eventRepository: IUserEventRepository): User {
	return new User(eventRepository);
}