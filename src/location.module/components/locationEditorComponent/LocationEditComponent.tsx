import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './LocationEditComponent.css';
import { Form, FormGroup, Label, Col, Input, Button, FormFeedback, Alert } from 'reactstrap';
import { NameField } from './formFields/NameField';
import { ShortNameField } from './formFields/ShortNameField';
import { NumericField } from './formFields/NumericField';
import { LocationState } from '../../types/LocationState';
import { AppState } from '../../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { addLocation } from '../../actions/LocationsAction';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';
type Props = {
    closePopup() : void;
};

const LocationEditComponent : React.FC<Props> = (props) =>{
  const [locationName, setLocationName] = React.useState<NameField>(NameField.initial);   
  const [locationShortName, setLocationshortName] = React.useState<ShortNameField>(ShortNameField.initial);
  const [width, setWidth] = React.useState<NumericField>(NumericField.initial);
  const [height, setHeight] = React.useState<NumericField>(NumericField.initial);
  const [printing, setPrinting] = React.useState(false);
  const [locationType, setLocationType] = React.useState(1);
  const [description, setDescription] = React.useState("");
  const location: LocationState = useSelector((state: AppState) => state.Location);
  
  const dispatch = useDispatch();

  const updateLocationName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setLocationName(NameField.create(e.target.value));
  }
  const updateLocationShortName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setLocationshortName(ShortNameField.create(e.target.value));
  }

  const updateLocationDescription = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setDescription(e.target.value);
  }

  const updateWidth = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setWidth(NumericField.create(e.target.value, "Szerekość lokalizacji musi być większa od 0!"));
  }
  const updateHeight = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setHeight(NumericField.create(e.target.value, "Wysokość lokalizacji musi być większa od 0!"))
  }
  const updatePrinting = ()=>{
    setPrinting(!printing);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setLocationName(NameField.create(locationName.value));
    setLocationshortName(ShortNameField.create(locationShortName.value));
    setWidth(NumericField.createFromNumber(width.value,"Szerekość lokalizacji musi być większa od 0!"));
    setHeight(NumericField.createFromNumber(height.value, "Wysokość lokalizacji musi być większa od 0!"));
    if(locationName.valid() && locationShortName.valid() && height.valid() && width.valid()){
        dispatch(addLocation(locationName.value, locationType, printing, description, height.value, width.value,locationShortName.value));
      }
    }
    return (
<div className='popup'>
    <div>
    {
            location.isLoading &&
                <LoadingSpinner message="Trwa tworzenie nowej lokalizacji..."/>
      }
    </div>
    <div className='popup_inner'>
      <div className="header">
          Utwórz nowa lokalizacje
           <a onClick={props.closePopup}> <AiFillCloseCircle className="close_buton" size="35"/> </a>
       </div>
       <Form className="form" onSubmit={handleSubmit}>
       <FormGroup row>
        <Label for="locatioName" sm={2}>Nazwa</Label>
        <Col sm={10}>
          <Input type="text" name="locationName" id="locationName"
          value={locationName?.value} onChange={updateLocationName()} maxlength="50"
          valid= {locationName.valid()} 
          invalid={locationName.invalid()} />
          <FormFeedback className="error_info"> 
            {locationName.error}
        </FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="shortName" sm={2}>Skrót</Label>
        <Col sm={10}>
          <Input type="text" name="shortName" id="shortName" 
            value={locationShortName?.value} onChange={updateLocationShortName()} maxlength="10"
            valid= {locationShortName.valid()} 
            invalid={locationShortName.invalid()} />
          <FormFeedback className="error_info"> 
            {locationShortName.error}
        </FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="width" sm={2}>Szerokość (metry)</Label>
        <Col sm={10}>
          <Input type="number" name="width" id="width"   
            value={width?.value} onChange={updateWidth()} 
            valid= {width.valid()} 
            invalid={width.invalid()} />
          <FormFeedback className="error_info"> 
            {width.error}
        </FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="height" sm={2}>Wysokość (metry)</Label>
        <Col sm={10}>
          <Input type="number" name="height" id="height"
            value={height?.value} onChange={updateHeight()} 
            valid= {height.valid()} 
            invalid={height.invalid()} />
          <FormFeedback className="error_info"> 
            {height.error}
        </FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="description" sm={2}>Opis</Label>
        <Col sm={10}>
          <Input type="textarea" name="description" id="description"
          onChange={updateLocationDescription()} value={description} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="locationType" sm={2}>Rodzaj lokalizacji</Label>
        <Col sm={10}>
        <Input type="select" name="select" id="locationType" onChange={(event)=>{setLocationType(Number.parseInt(event.target.value))}} value={locationType}>
          <option value="1">Lokalizacja specjalna (1 obiekt na lokacje)</option>
          <option value="2">Lokalizacja normalna (wiele obiektów)</option>
        </Input>
        </Col>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" onChange={updatePrinting} checked={printing} />{' '}
          Czy lokalizacja wspiera drukowanie?
        </Label>
      </FormGroup>
      <FormGroup>
            {ErrorMessages.hasErrorCode(location.errorCode) === true &&
                <Alert color="danger">
                    {ErrorMessages.getMessage(location.errorCode)}
                </Alert>
            }
      </FormGroup>
        <Button>Zapisz</Button>
       </Form>
     </div>
    </div>
);
}
export default LocationEditComponent;