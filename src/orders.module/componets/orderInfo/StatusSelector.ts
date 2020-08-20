const InProgress = " W trakcie";
const Finished = "Zakończony";
const UndefinedStatus = "Nieznany Status"
const InProgressId = 1;
const FinishedId = 2;

export default class StatusSelector{
    private statusId : number;
    constructor(statusId : number){
        this.statusId = statusId;
    } 

    getStatus = (): string=>{
        switch(this.statusId){
            case InProgressId:{
                return InProgress;
            }
            case FinishedId:{
                return Finished;
            }
            default:{
                return UndefinedStatus;
            }
        }
    }
}