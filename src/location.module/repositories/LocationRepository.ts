import { Environment } from "../../environment";
import { HttpClient } from "../../shared/HttpClient";
import { AddNewLocation } from "../models/AddNewLocation";
import { ResponseId } from "../../core.module/models/ResponseId";
import { LocationView } from "../models/LocationView";
import { PaginationList } from "../../shared/model/Pagination";

export class LocationRepository{
    private apiUrl : string = `${Environment.apiUrl}/locations`;
    private httpClient : HttpClient = new HttpClient();

    async Add(location : AddNewLocation) : Promise<ResponseId>{
        return this.httpClient.Post<AddNewLocation, ResponseId>(this.apiUrl, location);
    } 
    async GetLocations(pageNumber : number, pageSize : number) : Promise<PaginationList<LocationView>>{
        return await this.httpClient.Get<PaginationList<LocationView>>(this.apiUrl + `?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }
}