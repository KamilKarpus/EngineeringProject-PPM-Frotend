import { Interface } from "readline";

export interface ProductionFlow {
    name: string;
    id: string;
    isLoading: boolean;
    moveToTheNextPage : boolean;
    errorCode : number;
}

