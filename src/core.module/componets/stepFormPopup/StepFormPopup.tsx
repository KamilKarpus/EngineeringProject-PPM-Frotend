import React from 'react';
import './style.css';
import { AiFillCloseCircle } from "react-icons/ai";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AutoComplete from '../autoComplete/AutoComplete';
import { LocationView } from '../../models/LocationView';
import { LocationsRepository } from '../../repositories/LocationRepository';
type Props = {
    closePopup() : void
};

const StepFormPopup : React.FC<Props> = (props) => {
    const loadItems = (name : string) : Promise<LocationView[]> =>{
        const repository = new LocationsRepository();
        return repository.GetLocations(name);
    }
  return (
    <div className='popup'>
    <div className='popup_inner'>
      <div className="header">
          Utwórz nowy krok
           <a onClick={props.closePopup}> <AiFillCloseCircle className="close_buton" size="35"/> </a>
       </div>
       <Form method="POST" className="form">
            <FormGroup >
                <Label for="name">Nazwa nowego kroku:</Label>
                <Input type="text" name="name" id="name" placeholder="Nazwa kroku..."/>
            </FormGroup>
            <FormGroup >
                <Label for="days">Ilości dni potrzebna na ukończenie kroku</Label>
                <Input type="text" name="days" id="days" placeholder="Ilośc dni..."/>
            </FormGroup>
            <FormGroup >
                <Label for="percentage">Ilość procent</Label>
                <Input type="text" name="percentage" id="percentage" placeholder="Ilość procent..."/>
            </FormGroup>
            <FormGroup >
                <Label for="locatization">Lokalizacja</Label>
                <AutoComplete loadItems={loadItems}/>
            </FormGroup>
            <FormGroup>
                <Button color="secondary">Dodaj</Button>
            </FormGroup>
        </Form>
    </div>
  </div>
  )
};

export default StepFormPopup;
