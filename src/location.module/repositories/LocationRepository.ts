import { Environment } from "../../environment";
import { HttpClient } from "../../shared/HttpClient";
import { AddNewLocation } from "../models/AddNewLocation";
import { ResponseId } from "../../core.module/models/ResponseId";

export class LocationRepository{
    private apiUrl : string = `${Environment.apiUrl}/locations`;
    private httpClient : HttpClient = new HttpClient();

    async Add(location : AddNewLocation) : Promise<ResponseId>{
        return this.httpClient.Post<AddNewLocation, ResponseId>(this.apiUrl, location);
    } 

}