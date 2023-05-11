import {IDatabaseConnection} from "../IDatabaseConnection";
import {ILogger} from "../../../../../Core/ICore";

export class UserRepository {
    constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection) {
    }
}