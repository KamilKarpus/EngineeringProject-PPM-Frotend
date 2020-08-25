import { IValidationRule, Field } from "..";

export class EmailRule implements IValidationRule{
    private _error : string;
    getMessage(): string {
        return this._error;
    }
    constructor(error: string){
        this._error = error;
    }
    isValid(field: Field<any>): boolean {
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(field.value);
    }
    
}