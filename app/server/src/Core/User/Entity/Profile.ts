import {Role} from "../ValueObject/Role";
import {BaseEntity} from "../../../Shared/src/BaseEntity";
import { Dept } from './Dept';
import { Subprocess } from '../../Tnk/Entity/Subprocess';
import { ParsedRole } from '../ValueObject/ParsedRole';

export class Profile extends BaseEntity<number> {
    public title: string;
    public dept: Dept;
    public role: Role
    public isActive: boolean;
    public isTnkTypeEnabled: boolean;
    public availableSubprocess: Subprocess[];

    public getParsedRole(): ParsedRole {
        return this.role.parse();
    }
}