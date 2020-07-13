import IFormField from '../../../../shared/forms/IFormField';
export class NameField implements IFormField<string>{
    value: string;
    hasError: boolean;
    error: string;

    constructor(value : string){
        this.value = value;
        this.hasError = false;
        this.error = "";
    }
    hasValue(): boolean {
        return this.value.length > 0;
    }
    public validate(): void {
        if(this.value.length <=0){
            this.hasError = true;
            this.error = "Nazwa etapu nie może być pusta!"
        }
        if(this.value.length >=50){
            this.hasError = true ;
            this.error = "Nazwa etapu nie może być większa niż 50 znaków!"
        }
    }

}