import {IPostgresQueryOptions} from "../../../../Infrastructure/Persistent/Storage/Postgres/Postgres.storage";
import {DatabaseError} from "../../../../Core/Error/Database.error";

export interface IDatabaseConnection {
    query: <T>(
        sql: string,
        values?: any[],
        options?: IPostgresQueryOptions,
    ) => Promise<T[] | DatabaseError>

    queryOne: <T>(
        sql: string,
        values?: any[],
        options?: IPostgresQueryOptions,
    ) => Promise<T | DatabaseError>

    queryTx: <T>(
        sql: string[],
        values?: any[][],
        options?: IPostgresQueryOptions,
    ) => Promise<any | DatabaseError>
}