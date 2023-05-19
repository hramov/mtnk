import {Role} from "../ValueObject/Role";
import {BaseEntity} from "../../../Shared/src/BaseEntity";
import { BLock } from './Block';
import { Dept } from './Dept';
import { Subprocess } from '../../Tnk/Entity/Subprocess';

export class Profile extends BaseEntity<number> {
    public title: string;
    public block: BLock;
    public dept: Dept;
    public role: Role
    public isActive: boolean;
    public isTnkTypeEnabled: boolean;
    public availableSubprocess: Subprocess[];

    public getParsedRole() {
        return this.role.parse();
    }
}