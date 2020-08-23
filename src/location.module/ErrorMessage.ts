import { ErrorMessagesBase } from "../shared/ErrorMessageBase";

export class ErrorMessages extends ErrorMessagesBase{
    Initialize() : void{
        this.Errors[2001] = "Nazwa lokalizacji musi być unikalna!"
        this.Errors[2002] = "Skrót lokalizacji musi być unikalny!"
    }
}