import { HttpClient } from "../../shared/HttpClient";
import { Environment } from "../../environment";
import { RequestPrinting } from "../models/RequestPrinting";
import { ResponseId } from "../models/ResponseId";

export class PrintingRepository{
    private apiUrl : string = `${Environment.apiUrl}/api/printing`;
    private httpClient : HttpClient = new HttpClient();

    async Add(printing : RequestPrinting) : Promise<ResponseId>{
        return this.httpClient.Post<RequestPrinting, ResponseId>(this.apiUrl, printing);
    } 
    
}