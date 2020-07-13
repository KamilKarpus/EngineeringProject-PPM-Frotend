export default interface IFormField<Type>{
    value: Type;
    hasError : boolean;
    error : string;

    validate() : void;
    hasValue() : boolean;
}