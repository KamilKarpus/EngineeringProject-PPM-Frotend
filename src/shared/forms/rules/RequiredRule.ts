import { Field } from "../Field";
import { IValidationRule } from "./IValidationRule";


export class RequiredRule implements IValidationRule{
    private _error : string = "Pole jest wymagane."
    getMessage(): string {
        return this._error;
    }
    
    isValid(field: Field<any>): boolean {
        const value = field.value;
        if(typeof value === 'undefined' && value){
            return false;
        }
        return true;
    }
    
}