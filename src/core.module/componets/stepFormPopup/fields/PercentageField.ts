import IFormField from '../../../../shared/forms/IFormField';
export class PercentageField implements IFormField<number>{
    value: number;
    hasError: boolean;
    error: string;

    constructor(value : number){
        this.value = value;
        this.hasError = false;
        this.error = "";
    }
    validate(): void {
        if(this.value < 0 || this.value > 100){
            this.error = "Ilośc procent musi być większa od zera oraz suma procent wszystkich kroków musi mieścić się w przedziale 0 - 100%";
            this.hasError = true;
        }
        if(isNaN(this.value)){
            this.error = "Ilość project jest wymagana";
            this.hasError = true;
        }
    }
    hasValue(): boolean {
        return this.value > 0;
    }

}