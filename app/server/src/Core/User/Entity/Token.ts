import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Token extends BaseEntity<number> {
    public accessToken: string;
    public refreshToken: string;
}