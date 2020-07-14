import { Step } from "./StepView";

export interface FlowView {
    id: string;
    name: string;
    requiredDaysToFinish: number;
    statusName: string;
    statusId: number;
    steps: Step[];
}