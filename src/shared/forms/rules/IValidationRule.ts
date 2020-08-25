import { Field } from "../Field";

export interface IValidationRule{
    isValid(field: Field<any>) : boolean;
    getMessage() : string;
}