import { ThunkAction } from "redux-thunk";
import { AppState } from "../../reducers";
import { Action } from "redux";
import { PrintingRepository } from "../PrintingRepository";
import { RequestPrinting } from "../../models/RequestPrinting";

export const requestPackagePrinting = (
    packageId : string
  ): ThunkAction<void, AppState, unknown, Action<any>> => async () => {
    const repository = new PrintingRepository();
    await repository.Add(new RequestPrinting(packageId));
    };