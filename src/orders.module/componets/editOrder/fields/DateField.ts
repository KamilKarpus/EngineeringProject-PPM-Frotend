import { FormField } from "../../../../shared/forms/FormField";

export class DateField extends FormField<Date>{
    static initial : DateField = new DateField(new Date());

    constructor(value: Date){
        super(value);
    }
    static create(value: Date) : DateField{
        let field = new this(value);
        field.validate();
        return field;
    }

    hasValue(): boolean {
        return this.value !== null;
    }
    public validate(): void {
        let today = new Date();
        if(this.value == null){
            this.error = "Data końca zamówienia nie może być pusta.";
            this.hasError = true;
        }
        if(this.value < today){
            this.error = "Data końca zamówienia nie może być niższa badź równa aktualnej dacie.";
            this.hasError = true;
        }
    }
    
    invalid(): boolean{
        return this.hasError;
    }
    valid() : boolean{
        return !this.hasError;
    }

}