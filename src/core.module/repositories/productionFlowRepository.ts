import { ResponseId } from "../models/ResponseId";
import { HttpClient } from "../../shared/HttpClient";
import { AddNewStep } from "../models/AddNewStep";
import { AddNewFlow } from "../models/AddNewFlow";
import { FlowView } from "../models/FlowView";
import { ChangeStepPostion } from "../models/ChangeStepPostion";
import { Environment } from "../../environment";
import { Paggination } from "../../shared/model/Paggination";
import { FlowShortView } from "../models/FlowShortView";

export class ProductionFlowRepository{
    apiUrl : string = `${Environment.apiUrl}/administration`;
    httpClient : HttpClient = new HttpClient();

    async Add(flow : AddNewFlow): Promise<ResponseId> {
      return await this.httpClient.Post<AddNewFlow, ResponseId>(this.apiUrl, flow);
    }
    async AddStep(flowId: string, step: AddNewStep) : Promise<ResponseId>{
      return await this.httpClient.Post<AddNewStep, ResponseId>(this.apiUrl + `/${flowId}/steps`, step);
    }
    async GetFlow(id: string) : Promise<FlowView>{
      return await this.httpClient.Get<FlowView>(this.apiUrl + `/${id}`);
    }
    async ChangeStepPostion(id: string, changeStep : ChangeStepPostion ) {
      await this.httpClient.Put(this.apiUrl + `/${id}/stepsPosition`,changeStep);
    }
    async FinishFlow(id: string){
      await this.httpClient.Put(this.apiUrl + `/${id}`, {statusId: 2});
    }
    async GetFlows(pageNumber : number, pageSize : number) : Promise<Paggination<FlowShortView>>{
      return await this.httpClient.Get<Paggination<FlowShortView>>(this.apiUrl + `?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }
}