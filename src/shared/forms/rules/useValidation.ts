import { Field } from "../Field";
import { IValidationRule } from "./IValidationRule";


const useValidation = <T>(value: T, rules: IValidationRule[] ): Field<T> => {
    return new Field(value, rules);
  }
export default useValidation;