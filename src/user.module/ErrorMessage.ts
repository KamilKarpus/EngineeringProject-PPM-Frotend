import { ErrorMessagesBase } from "../shared/ErrorMessageBase"

export class ErrorMessages extends ErrorMessagesBase{
    Initialize() : void{
        this.Errors[1301] = "Adres email jest już zajęty."
        this.Errors[1302] = "Użytkownik nie istnieje."
    }

}