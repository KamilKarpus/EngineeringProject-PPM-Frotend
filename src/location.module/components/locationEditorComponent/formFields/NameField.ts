import { FormField } from "../../../../shared/forms/FormField";

export class NameField extends FormField<string>{
    static initial : NameField = new NameField("");

    constructor(value: string){
        super(value);
    }
    static create(value: string) : NameField{
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
            this.error = "Nazwa lokalizacji nie może być pusta!"
        }
        if(this.value.length >=50){
            this.hasError = true ;
            this.error = "Nazwa lokaliacji nie może być większa niż 50 znaków!"
        }
    }
}