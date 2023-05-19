import { ILogger } from '../../../../../Core/ICore';
import { IDatabaseConnection } from '../IDatabaseConnection';
import { DatabaseError } from '../../../../../Core/Error/Database.error';
import { Ip } from '../../../../../Shared/src/ValueObject/Objects/Ip';
import { IPostgresQueryOptions } from '../IPostgresQueryOptions';
import { IUserRepository } from '../../../../../Core/User/IUserRepository';
import { UserSearchParams } from '../../../../../Core/User/ValueObject/UserSearchParams';
import { User, UserConstructor } from '../../../../../Core/User/User';
import { Candidate } from '../../../../../Core/User/ValueObject/Candidate';

export class UserRepository implements IUserRepository {
    constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection<IPostgresQueryOptions>) {}

    async find(searchParams: UserSearchParams): Promise<User[] | DatabaseError> {
        const sql = `
			SELECT u.id, u.fio, u.username, u."isActive", u.password, u.ip, 
			    json_build_object('id', b.id, 'title', b.title) block,
                json_build_object('id', d.id, 'title', p.title) dept,
                json_build_object('id', p.id, 'title', p.title) profile 
			FROM report.user u
            JOIN dictionary.profile p on u."profileId" = p.id
			JOIN dictionary.block b on p."blockId" = b.id
			JOIN dictionary.dept d on p."deptId" = d.id
			LIMIT $1 OFFSET $2
		`;
        const params = [
            searchParams.limit,
            searchParams.offset
        ];

        return this.storage.query<User>(sql, params);
    }

    async getUserForLogin(username: string): Promise<Candidate | DatabaseError> {
        const sql = `SELECT id, username, password FROM report.user where username = $1`;
        const params = [username];
        return this.storage.queryOne<Candidate>(sql, params);
    }

    async create(dto: UserConstructor, userId: string, userIp: Ip): Promise<{ id: number } | DatabaseError> {
        const sql = `
            INSERT INTO report.tnk (title, "dateCreated", "processId", "subprocessId", "statusId", "tnkId", "creatorId", "creatorIp")
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id;
        `;
        const params = [
            dto.fio,
            dto.email,
            dto.username,
            dto.isActive,
            dto.ip,
            dto.password,
            dto.profile.id,
            userId,
            userIp.toString()
        ];

        return this.storage.queryOne<{ id: number }>(sql, params);
    }

    async update(dto: UserConstructor): Promise<{ id: number } | DatabaseError> {
        const sql = `
            UPDATE report.tnk
            SET title = $1, "processId" = $2, "subprocessId" = $3, "statusId" = $4
			WHERE "tnkId" = $5
			RETURNING id
        `;
        const params = [
            dto.fio,
            dto.email,
            dto.username,
            dto.isActive,
            dto.ip,
            dto.password,
            dto.profile.id
        ];

        return this.storage.queryOne<{ id: number }>(sql, params);
    }
}