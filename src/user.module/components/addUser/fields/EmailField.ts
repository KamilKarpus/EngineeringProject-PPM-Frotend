import { FormField } from "../../../../shared/forms/FormField";

export class EmailField extends FormField<string>{
    static initial : EmailField = new EmailField("");

    constructor(value: string){
        super(value);
    }
    static create(value: string) : EmailField{
        let field = new this(value);
        field.validate();
        return field;
    }

    hasValue(): boolean {
        return this.value.length > 0;
    }
    public validate(): void {
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!regexp.test(this.value.toLocaleLowerCase())){
            this.hasError = true;
            this.error = "Email powinien składać się w następujacy sposób nazwa@domena.pl"
        }

    }
}