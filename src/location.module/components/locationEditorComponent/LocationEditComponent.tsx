import React, { useEffect } from 'react';
import './LocationEditComponent.css';
import { Form, FormGroup, Label, Col, Input, Button, FormFeedback, Alert, ModalHeader, ModalBody, Modal, ModalFooter } from 'reactstrap';
import { NameField } from './formFields/NameField';
import { ShortNameField } from './formFields/ShortNameField';
import { NumericField } from './formFields/NumericField';
import { AppState } from '../../reducers';
import {  connect } from 'react-redux';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { addLocation } from '../../repositories/thunk-actions/LocationThunk-Action';
interface StateProps{
  isLoading: boolean;
  errorCode : number;
  fetchNeeded: boolean;
  getErrorMessage(code: number) : string;
}
interface DispatchProps{
  addLocation(name: string, type: number, handleQR: boolean, description: string,
    height: number, width: number, shortName: string) : void;
}

interface OwnProps {
  closePopup() : void;
  isOpen : boolean;
};
type Props = OwnProps & DispatchProps & StateProps;

const LocationEditComponent : React.FC<Props> = (props) =>{
  const [locationName, setLocationName] = React.useState<NameField>(NameField.initial);   
  const [locationShortName, setLocationshortName] = React.useState<ShortNameField>(ShortNameField.initial);
  const [width, setWidth] = React.useState<NumericField>(NumericField.initial);
  const [height, setHeight] = React.useState<NumericField>(NumericField.initial);
  const [printing, setPrinting] = React.useState(false);
  const [locationType, setLocationType] = React.useState(1);
  const [description, setDescription] = React.useState("");
  
  useEffect(()=>{
    if(props.fetchNeeded === true){
      props.closePopup();
    }
  },[props.fetchNeeded])

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
    setWidth(NumericField.create(e.target.value, "Szereko???? lokalizacji musi by?? wi??ksza od 0!"));
  }
  const updateHeight = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setHeight(NumericField.create(e.target.value, "Wysoko???? lokalizacji musi by?? wi??ksza od 0!"))
  }
  const updatePrinting = ()=>{
    setPrinting(!printing);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setLocationName(NameField.create(locationName.value));
    setLocationshortName(ShortNameField.create(locationShortName.value));
    setWidth(NumericField.createFromNumber(width.value,"Szereko???? lokalizacji musi by?? wi??ksza od 0!"));
    setHeight(NumericField.createFromNumber(height.value, "Wysoko???? lokalizacji musi by?? wi??ksza od 0!"));
    if(locationName.valid() && locationShortName.valid() && height.valid() && width.valid()){
        props.addLocation(locationName.value, locationType, printing, description, height.value, width.value,locationShortName.value);
      }
    }
    return (
    <Modal isOpen={props.isOpen} toggle={props.closePopup} size='lg'>
      {
          props.isLoading && <LoadingSpinner message="Trwa tworzenie nowej lokalizacji..."/>
      }
      <Form onSubmit={handleSubmit}>
      <ModalHeader toggle={props.closePopup}>Nowa paczka</ModalHeader>
      <ModalBody>
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
        <Label for="shortName" sm={2}>Skr??t</Label>
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
        <Label for="width" sm={2}>Szeroko???? (metry)</Label>
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
        <Label for="height" sm={2}>Wysoko???? (metry)</Label>
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
          <option value="2">Lokalizacja normalna (wiele obiekt??w)</option>
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
            {props.errorCode > 0 &&
                <Alert color="danger">
                    {props.getErrorMessage(props.errorCode)}
                </Alert>
            }
      </FormGroup>
      </ModalBody>
        <ModalFooter>
          <Button color="primary">Zapisz</Button>{' '}
          <Button color="secondary" onClick={props.closePopup}>Anuluj</Button>
        </ModalFooter>
        </Form>
      </Modal>
);
}
const mapDispatch = (
  dispatch: ThunkDispatch<any, any, AnyAction>
)=> {
  return{
    addLocation: (name: string, type: number, handleQR: boolean, description: string,
      height: number, width: number, shortName: string)  => (
          dispatch(addLocation(name, type, handleQR, description, height, width, shortName))
      ),
  }
}

const mapStateToProps = (store: AppState) => {
  const errors = new ErrorMessages();
  return {
      isLoading: store.Location.isLoading,
      errorCode: store.Location.errorCode,
      fetchNeeded: store.Location.fetchNedeed,
      getErrorMessage: (code: number) : string =>{
          return errors.getMessage(code);
      }
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(LocationEditComponent)