import { IValidationRule, Field } from "..";

export class PasswordRule implements IValidationRule{
    private _error : string;
    constructor(error: string){
        this._error = error;
    }
    getMessage(): string {
        return this._error;
    }
    
    isValid(field: Field<any>): boolean {
        var regexp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return regexp.test(field.value);
    }
    
}

