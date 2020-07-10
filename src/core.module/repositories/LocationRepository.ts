import { HttpClient } from "../../shared/HttpClient";
import { LocationView } from "../models/LocationView";

export class LocationsRepository{
    apiUrl : string = 'https://localhost:44343/api/locations';
    httpClient : HttpClient = new HttpClient();

    async GetLocations(locationName: string ) : Promise<LocationView[]> {
        return await this.httpClient.Get<LocationView[]>(this.apiUrl + `/byName?Name=${locationName}`);
        
    }

}