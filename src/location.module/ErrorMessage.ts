export class ErrorMessages{
    static Errors : {[key: number]: string} = {};

    static Initialize() : void{
        this.Errors[2001] = "Nazwa lokalizacji musi być unikalna!"
        this.Errors[2002] = "Skrót lokalizacji musi być unikalny!"
    }

    static hasErrorCode(errorCode : number) : boolean{
        let result = this.Errors[errorCode];
        return result !== undefined;
    }

    static getMessage(errorCode : number) : string{
        if(errorCode == 0){
            return "";
        }
        return this.Errors[errorCode];
    }
}