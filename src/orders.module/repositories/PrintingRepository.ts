import { Environment } from "../../environment";
import { RequestPrinting } from "../models/RequestPrinting";
import { ResponseId } from "../models/ResponseId";
import AuthClient from "../../shared/AuthClient";

export class PrintingRepository{
    private apiUrl : string = `${Environment.apiUrl}/api/printing`;
    private httpClient : AuthClient = new AuthClient();

    async Add(printing : RequestPrinting) : Promise<ResponseId>{
        return this.httpClient.Post<RequestPrinting, ResponseId>(this.apiUrl, printing);
    } 
    
}