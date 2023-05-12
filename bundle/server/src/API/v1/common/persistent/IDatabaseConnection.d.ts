import { IPostgresQueryOptions } from "../../../../Infrastructure/Persistent/Storage/Postgres/Postgres.storage";
export interface IDatabaseConnection {
    query: <T>(sql: string, values?: any[], options?: IPostgresQueryOptions) => Promise<T[] | Error>;
    queryOne: <T>(sql: string, values?: any[], options?: IPostgresQueryOptions) => Promise<T | Error>;
}
