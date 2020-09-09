export class StatusSelector{
    _status : {[key: number]: string};

    constructor(){
        this._status = {
            1: "W Budowanie",
            2: "Gotowy do użycia"
        }
    }

    hasValue(key: number) : boolean{
        if(typeof this._status[key] === "undefined"){
            return false;
        }
        return true;
    }

    getMessage(status : number) : string{
        if(this.hasValue(status)){
            return this._status[status];
        }
        return "Nieznany status";
    }
 
}