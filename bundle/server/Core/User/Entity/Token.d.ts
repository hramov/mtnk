import { BaseEntity } from "../../../Shared/src/BaseEntity";
export declare class Token extends BaseEntity<number> {
    accessToken: string;
    refreshToken: string;
}
