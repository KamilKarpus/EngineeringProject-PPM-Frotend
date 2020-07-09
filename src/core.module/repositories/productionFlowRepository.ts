import { AddNewFlow } from "../models/AddNewFlow";
import { ResponseId } from "../models/ResponseId";
import { HttpClient } from "../../shared/HttpClient";

export class ProductionFlowRepository{
    apiUrl : string = 'https://localhost:44343/api/administration';
    httpClient : HttpClient = new HttpClient();

    async Add(flow : AddNewFlow): Promise<ResponseId> {
      return await this.httpClient.Post<AddNewFlow, ResponseId>(this.apiUrl, flow);
    }
}