import { FormField } from "../../../../shared/forms/FormField";

export class NumericField extends FormField<number>{
    private message: string;

    static initial: NumericField = new NumericField(0, "");
    constructor(value : number, message :string){
        super(value);
        this.message = message;
    }
    static create(value : string, message : string) : NumericField {
        var field = new this(Number.parseFloat(value), message);
        field.validate();
        return field;
    }
    static createFromNumber(value : number, message : string) : NumericField {
        var field = new this(value, message);
        field.validate();
        return field;
    }
    validate(): void {
        if(this.value  <=0){
            this.hasError = true;
            this.error = this.message;
        }
    }
    hasValue(): boolean {
        return this.value > 0 ;
    }

}