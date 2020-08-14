import { PackageView } from "./PackageView";

export interface OrderView {
    id: string;
    companyName: string;
    orderedDate: Date;
    deliveryDate: Date;
    statusId: number;
    statusName: string;
    description: string;
    orderNumber: number;
    orderYear: number;
    packages: PackageView[];
}
