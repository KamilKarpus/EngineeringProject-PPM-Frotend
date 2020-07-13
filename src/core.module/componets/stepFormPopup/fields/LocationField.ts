import IFormField from '../../../../shared/forms/IFormField';
import { LocationView } from '../../../models/LocationView';
export class LocationField implements IFormField<LocationView>{
    value: LocationView;
    hasError: boolean;
    error: string;

    constructor(value : LocationView){
        this.value = value;
        this.hasError = false;
        this.error = "";
    }
    hasValue(): boolean {
        return this.value.name.length > 0;
    }
    public validate(): void {
        if(this.value.name.length <=0){
            this.hasError = true;
            this.error = "Nazwa pola nie może być pusta!"
        }
    }

}