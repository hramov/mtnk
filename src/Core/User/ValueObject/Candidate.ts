import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";

export class Candidate {
    public userId: Uuid;
    public username: string;
    public plainPassword: string;
    public hashedPassword: string;
    public isRemember: boolean;
}