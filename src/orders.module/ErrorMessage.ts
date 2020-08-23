import { ErrorMessagesBase } from "../shared/ErrorMessageBase";

export class ErrorMessage extends ErrorMessagesBase{
    Initialize() : void{
        this.Errors[4001] = "Proces produkcyjny nie istnieje.";
        this.Errors[4002] = "Zamówienie nie istnieje.";
        this.Errors[4003] = "Paczka nie istnieje.";
    };
}