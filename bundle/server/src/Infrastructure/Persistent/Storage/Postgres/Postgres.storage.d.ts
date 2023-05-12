export interface IPostgresConnOptions {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}
export interface IPostgresQueryOptions {
}
export declare class PostgresStorage {
    private readonly conn;
    constructor(connOptions: IPostgresConnOptions);
    query<T>(sql: string, values?: any[], options?: IPostgresQueryOptions): Promise<T[] | Error>;
    queryOne<T>(sql: string, values?: any[], options?: IPostgresQueryOptions): Promise<T | Error>;
}
