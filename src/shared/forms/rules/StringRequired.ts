import { IValidationRule, Field } from "..";

export class StringRequiredRule implements IValidationRule{
    private _error : string;
    constructor(error: string){
        this._error = error;
    }
    getMessage(): string {
        return this._error;
    }
    
    isValid(field: Field<any>): boolean {
        const value = field.value;
        if(typeof value === 'undefined' && value || value.length <= 0){
            return false;
        }
        return true;
    }
    
}