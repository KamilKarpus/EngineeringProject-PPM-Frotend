import { Environment } from "../../environment";
import { HttpClient } from "../../shared/HttpClient";
import { FlowView } from "../../core.module/models/FlowView";

export class FlowRepository{
    apiUrl : string = `${Environment.apiUrl}/api/administration`;
    httpClient : HttpClient = new HttpClient();

    async GetFlow(name: string) : Promise<FlowView[]>{
        return await this.httpClient.Get<FlowView[]>(this.apiUrl + `/byName?FlowName=${name}`);
      }
}