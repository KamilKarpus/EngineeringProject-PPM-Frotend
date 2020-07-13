import React from 'react';
import './style.css';
import { AiFillCloseCircle } from "react-icons/ai";
import { Form, FormGroup, Label, Input, Button, FormFeedback, Alert} from 'reactstrap';
import AutoComplete from '../autoComplete/AutoComplete';
import { LocationView } from '../../models/LocationView';
import { LocationsRepository } from '../../repositories/LocationRepository';
import { StepsState } from '../../types/Step';
import { AppState } from '../../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { NameField } from './fields/NameField';
import { DaysField } from './fields/DaysField';
import { PercentageField } from './fields/PercentageField';
import { LocationField } from './fields/LocationField';
import { useHistory } from 'react-router-dom';
import { addStep } from '../../actions/StepsAction';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';

type Props = {
    closePopup() : void
};
const nameFieldInitial = new NameField("");
const daysFieldInitial = new DaysField(0);
const percentageFieldInitial = new PercentageField(0);
const locationFieldInitial = new LocationField(new LocationView("",""));

const StepFormPopup : React.FC<Props> = (props) => {

    const state: StepsState = useSelector((state: AppState) => state.stepsState);
    const [nameField, setNameField] = React.useState<NameField>(nameFieldInitial);  
    const [daysField, setDaysField] = React.useState<DaysField>(daysFieldInitial);
    const [percentageField, setPercentageField] = React.useState<PercentageField>(percentageFieldInitial);
    const [locationField, setLocationField] = React.useState<LocationField>(locationFieldInitial);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nameField.validate();
        daysField.validate();
        percentageField.validate();
        locationField.validate();
        if(!locationField.hasError && !daysField.hasError && !nameField.hasError && !percentageField.hasError){
            dispatch(addStep(nameField.value, daysField.value, locationField.value.id, percentageField.value, history.location.state.id));
        }
      };
    if(state.isAdded){
        props.closePopup();
    }
    const loadItems = (name : string) : Promise<LocationView[]> =>{
        const repository = new LocationsRepository();
        return repository.GetLocations(name);
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
    <div className='popup'>
    <div>
    {
            state.isLoading &&
                <LoadingSpinner message="Trwa dodawania nowego etapu produkcji..."/>
    }
    </div>
    <div className='popup_inner'>
      <div className="header">
          Utwórz nowy krok
           <a onClick={props.closePopup}> <AiFillCloseCircle className="close_buton" size="35"/> </a>
       </div>
       <Form className="form" onSubmit={handleSubmit}>
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
            {ErrorMessages.getMessage(state.errorCode) !== "" &&
                <Alert color="danger">
                    {ErrorMessages.getMessage(state.errorCode)}
                </Alert>
            }
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
