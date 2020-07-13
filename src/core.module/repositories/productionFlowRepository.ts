import { ResponseId } from "../models/ResponseId";
import { HttpClient } from "../../shared/HttpClient";
import { AddNewStep } from "../models/AddNewStep";
import { AddNewFlow } from "../models/AddNewFlow";

export class ProductionFlowRepository{
    apiUrl : string = 'https://localhost:44343/api/administration';
    httpClient : HttpClient = new HttpClient();

    async Add(flow : AddNewFlow): Promise<ResponseId> {
      return await this.httpClient.Post<AddNewFlow, ResponseId>(this.apiUrl, flow);
    }
    async AddStep(flowId: string, step: AddNewStep) : Promise<ResponseId>{
      return await this.httpClient.Post<AddNewStep, ResponseId>(this.apiUrl + `/${flowId}/steps`, step);
    }
}