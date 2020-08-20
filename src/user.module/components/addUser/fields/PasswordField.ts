import { FormField } from "../../../../shared/forms/FormField";

export class PasswordField extends FormField<string>{
    static initial : PasswordField = new PasswordField("");

    constructor(value: string){
        super(value);
    }
    static create(value: string) : PasswordField{
        let field = new this(value);
        field.validate();
        return field;
    }

    hasValue(): boolean {
        return this.value.length > 0;
    }
    public validate(): void {
        var regexp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(!regexp.test(this.value)){
            this.hasError = true;
            this.error = "Hasło powinno się składać z 8 znaków, zawierać jedną literę oraz cyfrę."
        }

    }
}