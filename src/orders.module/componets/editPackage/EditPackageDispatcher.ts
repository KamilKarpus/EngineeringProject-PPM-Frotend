import { Dispatch } from "redux";
import { addPackageRequest } from "../../actions/OrderActions";

export class PackageDispatcher {
    
    private readonly dispatch: Dispatch<any>;
    
    constructor(dispatch: Dispatch<any>){
        this.dispatch = dispatch; 
    }

    addPackage = (flowId: string,weight: number,height: number,width: number, orderId : string) =>{
        this.dispatch(addPackageRequest(flowId, weight, height, width, orderId));
    }
}