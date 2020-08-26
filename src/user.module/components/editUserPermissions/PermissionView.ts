export default class PermissionView{
    public View: boolean;
    public EditFlow: boolean;
    public CanExecuteFlow : boolean;
    public EditLocation : boolean;
    public ManageUsers : boolean;

    constructor(){
            this.View = false;
            this.EditFlow = false;
            this.CanExecuteFlow = false;
            this.EditLocation = false;
            this.ManageUsers = false;
    }
}