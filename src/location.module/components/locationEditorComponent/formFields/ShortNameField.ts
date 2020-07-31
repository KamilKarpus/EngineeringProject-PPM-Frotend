import { FormField } from "../../../../shared/forms/FormField";

export class ShortNameField  extends FormField<string>{

    static initial : ShortNameField = new ShortNameField("");
    hasValue(): boolean {
        return this.value.length > 0;
    }
    static create(value: string) : ShortNameField{
        let field = new this(value);
        field.validate();
        return field;
    }
    public validate(): void {
        if(this.value.length <=0){
            this.hasError = true;
            this.error = "Skrót lokalizacji nie może być pusty!"
        }
        if(this.value.length >=50){
            this.hasError = true ;
            this.error = "Skrót lokalizacji nie może posiadać więcej znaków niż 10!"
        }
    }
}