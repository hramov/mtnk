import {IPostgresQueryOptions} from "../../../../Infrastructure/Persistent/Storage/Postgres/Postgres.storage";
import {DatabaseError} from "../../error/Database.error";

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
}