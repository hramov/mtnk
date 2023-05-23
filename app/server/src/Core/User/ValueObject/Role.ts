import { ValueObject } from '../../../Shared/src/ValueObject/ValueObject';
import { ParsedRole } from './ParsedRole';
import { Roles } from '../Roles';

/**
 * Ролевая модель
 * Х    ХХ   ХХ
 * роль блок подразделение
 *
 * Роли:
 * 1 - Администратор МТНК или блока (если указан)
 * 2 - Администратор подразделения
 * 3 - Создатель ТНК
 * 4 - Согласующий ТНК
 * 5 - Аудитор ТНК
 *
 * Примеры:
 * 1 - Администратор МТНК
 * 101 - Администратор технологического блока
 * 20101 - Администратор подразделения технологического блока
 * 30101 - Создатель ТНК подразделения технологического блока
 * 4 - Комитет ТНК (согласует все ТНК, где указан как согласующий)
 * 5 - Аудитор ТНК
 */

const MaxRoleLength = 5;

export class Role extends ValueObject {
    private role: string;

    constructor(role: string) {
        super()
        this.role = role;
    }

    public parse(): ParsedRole {
        this.role = this.normalize();
        const blockId = Number(this.role[1] + this.role[2]) || null;
        const deptId = Number(this.role[3] + this.role[4]) || null;
        return new ParsedRole(this.role[0], blockId, deptId);
    }

    private normalize(): string {
        let val = this.role;
        const iterations = MaxRoleLength - this.role.length
        for (let i = 0; i < iterations; i++) {
            val += '0';
        }
        return val;
    }

    protected *getEqualityComponents(): IterableIterator<Object> {
        yield this.role;
    }
}