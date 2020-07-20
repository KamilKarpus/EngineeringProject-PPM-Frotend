import { HttpClient } from "../../shared/HttpClient";
import { LocationView } from "../models/LocationView";
import { Environment } from "../../environment";

export class LocationsRepository{
    apiUrl : string = `${Environment.apiUrl}/locations`;
    httpClient : HttpClient = new HttpClient();

    async GetLocations(locationName: string ) : Promise<LocationView[]> {
        return await this.httpClient.Get<LocationView[]>(this.apiUrl + `/byName?Name=${locationName}`);
        
    }

}