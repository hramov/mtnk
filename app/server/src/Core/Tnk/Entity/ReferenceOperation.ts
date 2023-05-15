import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {Duration} from "../ValueObject/Duration";
import {Unit} from "./Unit";
import {Source} from "./Source";

export type ReferenceOperationConstructor = {
    title: string;
    duration: Duration;
    unit: Unit;
    source: Source;
    docNum: number;
    blockId: number;
}

export class ReferenceOperation extends BaseEntity<number> {
    public title: string;
    public duration: Duration;
    public unit: Unit;
    public source: Source;
    public docNum: number;
    public blockId: number;

    constructor(referenceOperation: ReferenceOperationConstructor) {
        super()
        this.title = referenceOperation.title;
        this.duration = referenceOperation.duration;
        this.unit = referenceOperation.unit;
        this.source = referenceOperation.source;
        this.docNum = referenceOperation.docNum;
        this.blockId = referenceOperation.blockId;
    }
}