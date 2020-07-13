import IFormField from '../../../../shared/forms/IFormField';
export class DaysField implements IFormField<number>{
    value: number;
    hasError: boolean;
    error: string;

    constructor(value : number){
        this.value = value;
        this.hasError = false;
        this.error = "";
    }
    validate(): void {
        if(this.value < 0){
            this.error = "Ilośc dni musi być większa od zera";
            this.hasError = true;
        }
        if(this.value > 100){
            this.error = "Ilośc dni musi być mniejsza od 100";
            this.hasError = true;
        }
        if(isNaN(this.value)){
            this.error = "Ilość dni jest wymagana";
            this.hasError = true;
        }
    }
    hasValue(): boolean {
        return this.value !== null && this.value > 0 && !isNaN(this.value);
    }

}