import PermissionView from "./PermissionView";

export const View = "View";
export const EditFlow ="EditFlow";
export const Operator = "CanExecuteFlow";
export const EditLocation = "EditLocation";
export const ManageUsers = "ManageUsers";

export class TranslateService{
    private _permissions: string[];
    constructor(permissions: string[]){
        this._permissions = permissions;
    }

    exists(permission: string) : boolean{
        const result = this._permissions.find(p=>permission === p);
        return result ? true: false;;
    }

    translate() : PermissionView{
        const model = new PermissionView();
        if(this.exists("View")){
            model.View = true;
        }
        if(this.exists("EditFlow")){
            model.EditFlow = true;
        }
        if(this.exists("CanExecuteFlow")){
            model.CanExecuteFlow = true;
        }
        if(this.exists("EditLocation")){
            model.EditLocation = true;
        }
        if(this.exists("ManageUsers")){
            model.ManageUsers = true;
        }
        return model;
    } 
}

