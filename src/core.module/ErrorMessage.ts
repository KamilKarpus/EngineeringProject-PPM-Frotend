export class ErrorMessages{
    static Errors : {[key: number]: string} = {};

    static Initialize() : void{
        this.Errors[1006] = "Nazwa jest już użyta."
    }

     static getMessage(errorCode : number) : string{
        return this.Errors[errorCode];
    }
}