import { LocationView } from "../models/LocationView";
import { Environment } from "../../environment";
import AuthClient from "../../shared/AuthClient";

export class LocationsRepository{
    apiUrl : string = `${Environment.apiUrl}/api/locations`;
    httpClient : AuthClient = new AuthClient();

    async GetLocations(locationName: string ) : Promise<LocationView[]> {
        return await this.httpClient.Get<LocationView[]>(this.apiUrl + `/byName?Name=${locationName}`);
        
    }

}