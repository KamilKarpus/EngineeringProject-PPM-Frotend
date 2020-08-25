import React from 'react';
import './style.css';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Alert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import AutoComplete from '../autoComplete/AutoComplete';
import { LocationView } from '../../models/LocationView';
import { NameField } from './fields/NameField';
import { DaysField } from './fields/DaysField';
import { PercentageField } from './fields/PercentageField';
import { LocationField } from './fields/LocationField';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { addStepAsync } from '../../repositories/Thunk-Actions/StepsThunk-Actions';
import { fetchLocations } from '../../repositories/Thunk-Actions/LocationsThunk-Actions';
import { AppState } from '../../reducers';


interface StateProps{
    isLoading: boolean;
    isAdded: boolean;
    errorCode: number;
  }
  interface DispatchProps{
    addStep(name: string, days: number, locationId: string, percentage: number, flowId : string) : void;
    getLocations(locationName: string ) : Promise<LocationView[]>; 
    getErrorMessage(code: number) : string;
  }
  
  interface OwnProps {
    closePopup() : void;
    isOpen : boolean;
  };

type Props = StateProps & DispatchProps & OwnProps;

const nameFieldInitial = new NameField("");
const daysFieldInitial = new DaysField(0);
const percentageFieldInitial = new PercentageField(0);
const locationFieldInitial = new LocationField(new LocationView("",""));

const StepFormPopup : React.FC<Props> = (props) => {

    const [nameField, setNameField] = React.useState<NameField>(nameFieldInitial);  
    const [daysField, setDaysField] = React.useState<DaysField>(daysFieldInitial);
    const [percentageField, setPercentageField] = React.useState<PercentageField>(percentageFieldInitial);
    const [locationField, setLocationField] = React.useState<LocationField>(locationFieldInitial);
    const history = useHistory();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nameField.validate();
        daysField.validate();
        percentageField.validate();
        locationField.validate();
        if(!locationField.hasError && !daysField.hasError && !nameField.hasError && !percentageField.hasError){
            props.addStep(nameField.value, daysField.value, locationField.value.id, percentageField.value, history.location.state.id);
        }
      };
    if(props.isAdded){
        props.closePopup();
    }
    const loadItems = (name : string) : Promise<LocationView[]> =>{
        return props.getLocations(name);
    }
    const updateNameField = () => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newField = new NameField(e.target.value);
        newField.validate();
        setNameField(newField);
    }
    const updateDaysField = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newField = new DaysField(Number.parseInt(e.target.value));
        newField.validate();
        setDaysField(newField);
    }
    const updatePercentageField = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newField = new PercentageField(Number.parseInt(e.target.value));
        newField.validate();
        setPercentageField(newField);    
    }
    const updateLocationField = (locationView : LocationView) =>{
        const newField = new LocationField(locationView);
        newField.validate();
        setLocationField(newField);
    }
  return (
    <Modal isOpen={props.isOpen} toggle={props.closePopup} size='lg'>
    {
        props.isLoading && <LoadingSpinner message="Trwa dodawanie nowego kroku..."/>
    }
    <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={props.closePopup}>Nowa paczka</ModalHeader>
        <ModalBody>
            <FormGroup >
                <Label for="name">Nazwa nowego kroku:</Label>
                <Input 
                    valid={!nameField.hasError && nameField.hasValue()} 
                    invalid={nameField.hasError} 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Nazwa kroku..."
                    value={nameField?.value}
                    onChange={updateNameField()}
                    maxlength="50"
                    />
            
                <FormFeedback className="error_info"> 
                        {nameField.error}
                </FormFeedback>
            </FormGroup>
            <FormGroup >
                <Label for="days">Ilości dni potrzebna na ukończenie kroku</Label>
                <Input 
                    type="number" 
                    name="days" 
                    id="days" 
                    placeholder="Ilośc dni..."
                    min="1"
                    max="100"
                    value={daysField.value}
                    valid={!daysField.hasError && daysField.hasValue()} 
                    invalid={daysField.hasError} 
                    onChange={updateDaysField()}
                    />
                <FormFeedback className="error_info">
                        {daysField.error}
                </FormFeedback>
            </FormGroup>
            <FormGroup >
                <Label for="percentage">Ilość procent</Label>
                <Input 
                    type="number" 
                    name="percentage" 
                    id="percentage" 
                    placeholder="Ilość procent..."
                    min="1"
                    max="100"
                    value={percentageField.value}
                    valid={!percentageField.hasError && percentageField.hasValue()} 
                    invalid={percentageField.hasError} 
                    onChange={updatePercentageField()}
                    />
                <FormFeedback className="error_info">
                    {percentageField.error}
                </FormFeedback>
            </FormGroup>
            <FormGroup >
                <Label for="locatization">Lokalizacja</Label>
                <AutoComplete 
                    loadItems={loadItems} 
                    updateLocation={updateLocationField} 
                    invalid={locationField.hasError}
                    valid={!locationField.hasError && locationField.hasValue()} />
            </FormGroup>
            <FormGroup>
            { props.errorCode > 0 &&
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
  )
};
const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    const errors = new ErrorMessages();
    return{
        addStep: (name: string, days: number, locationId: string, percentage: number, flowId : string)  => (
            dispatch(addStepAsync(name, days, locationId, percentage, flowId))
        ),
        getLocations: (locationName: string ) =>(
            dispatch(fetchLocations(locationName))
        ),
        getErrorMessage:(code: number): string=>{
            return errors.getMessage(code);
        }
    }
  }
  
  const mapStateToProps = (store: AppState) => {
    return {
        
        isLoading: store.stepsState.isLoading,
        isAdded: store.stepsState.isAdded,
        errorCode: store.stepsState.errorCode
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatch
  )(StepFormPopup)

