import React, { Fragment } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
import { FlowView } from "../../models/FlowView";


type Props = {
    loadItems(name : string) : Promise<FlowView[]>;
    updateFlow(flow: FlowView) : void;
    valid: boolean;
    invalid: boolean;
}
const AutoComplete : React.FC<Props> = (props) =>{
    const [isOpen, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [flows, setFlows] = React.useState<FlowView[]>([]);
    const [flow, setFlow] = React.useState<FlowView>();
    const toggle =() =>{
        if(flows.length > 0){
        setOpen(!isOpen);
        }
    }
    const getItems = async () =>{
        if(name.length > 0){
            const flowsDTO = await props.loadItems(name);
            if(flowsDTO != null){
                setFlows(flowsDTO);
                setOpen(!isOpen);
            }
        }
    }
    const updateName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.currentTarget.value);     
        getItems();
    }
    return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle tag="div">
            <Input  
                  value={name}
                  onChange={updateName()}
                  invalid={props.invalid}
                  valid={props.valid}
            />
        </DropdownToggle>
        <DropdownMenu>
          {flows.length > 0 ? flows.map(p => (
            <Fragment>
              <DropdownItem header key={p.id} > 
                    <div onClick={()=>{
                        setName(p.name); 
                        setFlow(p); 
                        props.updateFlow(p);
                        }}>                    
                        {p.name}
                    </div>
              </DropdownItem>
            </Fragment>
           )) : null}
        </DropdownMenu>
    </Dropdown>
    );
}

export default AutoComplete;