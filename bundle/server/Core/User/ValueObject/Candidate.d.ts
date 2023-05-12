import { Uuid } from "../../../Shared/src/ValueObject/Objects/Uuid";
export declare class Candidate {
    userId: Uuid;
    username: string;
    plainPassword: string;
    hashedPassword: string;
    isRemember: boolean;
}
