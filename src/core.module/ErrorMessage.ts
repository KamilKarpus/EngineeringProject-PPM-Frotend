export class ErrorMessages{
    static Errors : {[key: number]: string} = {};

    static Initialize() : void{
        this.Errors[1006] = "Nazwa jest już użyta."
        this.Errors[1010] = "Nazwa etapu musi być unikalna."
        this.Errors[1008] = "Pierwsza lokalizacja musi wspierać drukowanie."
        this.Errors[1007] = "Wybrana lokalizacja nie istnieje."
        this.Errors[1004] = "Dodany etap musi posiadać wyższy procent realizacji niż poprzedni."
        this.Errors[1003] = "Procent realizacji nie może być większy niż 100%";
    }

     static getMessage(errorCode : number) : string{
        if(errorCode == 0){
            return "";
        }
        return this.Errors[errorCode];
    }
}