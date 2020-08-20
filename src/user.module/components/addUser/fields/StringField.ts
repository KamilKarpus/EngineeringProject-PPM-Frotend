import { FormField } from "../../../../shared/forms/FormField";

export class StringField extends FormField<string>{
    static initial : StringField = new StringField("");

    constructor(value: string){
        super(value);
    }
    static create(value: string) : StringField{
        let field = new this(value);
        field.validate();
        return field;
    }

    hasValue(): boolean {
        return this.value.length > 0;
    }
    public validate(): void {
        if(this.value.length <=0){
            this.hasError = true;
            this.error =  "To pole jest wymagane!";
        }
        if(this.value.length >=50){
            this.hasError = true ;
            this.error = "Wielkość pola nie może być większa niż 50"
        }
    }
}