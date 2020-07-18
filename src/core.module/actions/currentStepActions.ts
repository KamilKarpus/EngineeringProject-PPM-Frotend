export const STEP_CHANGE = "STEP_CHANGE";
export interface StepChangeNumberAction{
    type: typeof STEP_CHANGE;
    payload: number;
}

export type CurrentStepActions = StepChangeNumberAction;