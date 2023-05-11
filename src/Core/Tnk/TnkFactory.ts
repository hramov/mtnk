import {TnkType} from "./TnkType";
import {OrdinaryTnk} from "./OrdinaryTnk";
import {AttributesTnk} from "./AttributesTnk";

export class TnkFactory {
    public static getTnk(tnkType: TnkType) {
        switch(tnkType) {
            case TnkType.Ordinary:
                return new OrdinaryTnk()
            case TnkType.Attribute:
                return new AttributesTnk()
        }
    }
}