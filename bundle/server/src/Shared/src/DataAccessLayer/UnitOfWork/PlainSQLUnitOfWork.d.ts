import { IDatabaseConnection } from '../IDatabaseConnection';
import { QueryOptions } from '../QueryOptions';
import { IUnitOfWork } from './IUnitOfWork';
export declare class PlainSQLUnitOfWork implements IUnitOfWork {
    private readonly connection;
    constructor(connection: IDatabaseConnection);
    query<T>(query: string[], params?: Array<Array<string>>, opts?: QueryOptions): Promise<Error | T>;
}
