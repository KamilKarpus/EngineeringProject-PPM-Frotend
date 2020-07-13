import React, { Fragment } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
import { LocationView } from "../../models/LocationView";

type Props = {
    loadItems(locationName: string) : Promise<LocationView[]>;
    updateLocation(LocationView: LocationView) : void;
    valid: boolean;
    invalid: boolean;
}
const AutoComplete : React.FC<Props> = (props) =>{
    const [isOpen, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [locations, setLocations] = React.useState<LocationView[]>([]);
    const [location, setLocation] = React.useState<LocationView>();
    const toggle =() =>{
        if(locations.length > 0){
        setOpen(!isOpen);
        }
    }
    const getLocations = async () =>{
        if(name.length > 0){
            const locationsDTO = await props.loadItems(name);
            if(locationsDTO != null){
                setLocations(locationsDTO);
                setOpen(!isOpen);
            }
        }
    }
    const updateName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.currentTarget.value);     
        getLocations();
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
          {locations.length > 0 ? locations.map(p => (
            <Fragment>
              <DropdownItem header key={p.id} > 
                    <div onClick={()=>{
                        setName(p.name); 
                        setLocation(p); 
                        props.updateLocation(p);
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