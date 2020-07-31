import IFormField from "./IFormField";

export abstract class FormField<T> implements IFormField<T>{
    value: T;
    hasError: boolean;
    error: string;
    
    constructor(value: T){
        this.value = value;
        this.hasError = false;
        this.error = "";
    }
    abstract validate() : void;
    abstract hasValue(): boolean;

    invalid(): boolean{
        return this.hasError && !this.hasValue();
    }
    valid() : boolean{
        return !this.hasError && this.hasValue();
    }
}