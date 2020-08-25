import { IValidationRule } from "./rules/IValidationRule";


export class Field<T>{
    private _rules : IValidationRule[] = [];

    public error: string;
    public value: T;
    public hasError : boolean;
    public isValid : boolean;

    constructor(value: T, rules: IValidationRule[]){
        this.value = value;
        this._rules = rules;
        this.error = "";
        this.hasError = false;
        this.isValid = true;

    }
    addRule(rule: IValidationRule) : void{
        this._rules.push(rule);
    }
    validate() : void{
            for(const rule of this._rules){
                if(!rule.isValid(this)){
                    this.isValid = false;
                    this.hasError = true;
                    this.error = rule.getMessage();
                    break;
                }
        }
    }
    getRules() : IValidationRule[]{
        return this._rules;
    }
    static createField<T>(value: T, field : Field<T>) : Field<T>{
        const newfield = new  Field<T>(value, field.getRules());
        newfield.validate();
        return newfield;
    }
    static validateField<T>(field : Field<T>) : Field<T>{
        const newfield = new  Field<T>(field.value, field.getRules());
        newfield.validate();
        return newfield;
    }

}