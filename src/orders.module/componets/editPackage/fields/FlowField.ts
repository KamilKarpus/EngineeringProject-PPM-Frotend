import { FlowView } from '../../../models/FlowView';
import { FormField } from '../../../../shared/forms/FormField';
import { FlowMessage } from '../ValidateMessages';
export class FlowField extends FormField<FlowView>{

    static Initial : FormField<FlowView> = new FlowField(new FlowView("",""));

    static Create(value: FlowView) : FlowField{
        let field = new this(value);
        field.validate();
        return field;
    }

    hasValue(): boolean {
        return this.value.name.length > 0;
    }
    public validate(): void {
        if(this.value.name.length <=0){
            this.hasError = true;
            this.error = FlowMessage;
        }
    }

}