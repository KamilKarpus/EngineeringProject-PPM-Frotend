import PermissionView from "../components/editUserPermissions/PermissionView";
import { PermissionModel } from "./PermissionModel";

export const View = "View";
export const EditFlow ="EditFlow";
export const Operator = "CanExecuteFlow";
export const EditLocation = "EditLocation";
export const ManageUsers = "ManageUsers";

export class PermissionConvertService{
    private _permssionView: PermissionView;
    constructor(permssionView : PermissionView){
        this._permssionView = permssionView;
    }

    public convert() : PermissionModel{
        var permissions = Array<string>();
        if(this._permssionView.View === true){
            permissions.push(View);
        }
        if(this._permssionView.CanExecuteFlow === true){
            permissions.push(Operator);
        }
        if(this._permssionView.EditFlow === true){
            permissions.push(EditFlow);
        }
        if(this._permssionView.ManageUsers === true){
            permissions.push(ManageUsers);
        }
        if(this._permssionView.EditLocation === true){
            permissions.push(EditLocation);
        }
        return new PermissionModel(permissions);
    }

}