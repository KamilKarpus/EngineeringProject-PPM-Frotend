import React, { useEffect } from 'react';
import { STEP_CHANGE } from '../../actions/currentStepActions';
import { useDispatch, useSelector } from 'react-redux';
import { StepsState } from '../../types/Step';
import { AppState } from '../../reducers';
import { Button, Alert } from 'reactstrap';
import './StepSummary.css';
import { useHistory } from 'react-router-dom';
import AlertComponent from '../../../shared/components/alerts/AlertComponent';
import { finishFlow, getFlow } from '../../actions/StepsAction';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';
const StepSummary = () =>{
    const [isOpen, setOpen] = React.useState(false);
    const [answer, setAnswer] = React.useState(false);
    const closePopup = () =>{
        setOpen(false);
    }
    const openPopup = () =>{
        setOpen(true);
    } 
    const dispatch = useDispatch();
    const state: StepsState = useSelector((state: AppState) => state.stepsState);
    const history = useHistory();
    useEffect(()=>{
        dispatch({
            type: STEP_CHANGE,
            payload: 3
          })
    },[]);
    useEffect(()=>{
        dispatch(getFlow(history.location.state.id));
    },[state.fetchNeeded])

    
    const navigateToSteps= () =>{
        history.push(`/flow/${history.location.state.id}/steps`, {id: history.location.state.id});
      }
    const answerChange = (value : boolean) =>{
        setAnswer(value);
    }

    if(answer){
        dispatch(finishFlow(history.location.state.id));
        setAnswer(false);
        if(state.flowView.isValid){
            history.push('/flow/list');
        }
    }
    return(
        <div className="wrapper">
            {  state.isLoading &&
                <LoadingSpinner message={state.loadingMessage}/>}
            {isOpen ? <AlertComponent closePopup={closePopup} header="Potwierdzenie ukończenia" message="Zakończenie tego etapu spowoduje, że proces przejedzie w status aktywny. Czy jesteś pewień że chcesz zakończyć proces budowania?" setAnswer={answerChange}/> : null}
            <div>
                <h1>Podsumowanie procesu produkcyjnego {state.flowView.name}</h1>
                <table>
                    <tr>
                        <td>
                            Liczba dni potrzebnych na ukończenie:
                        </td>
                        <td>
                            {state.flowView.requiredDaysToFinish}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Status:
                        </td>
                        <td>
                            {state.flowView.statusId === 1 ? "W budowie" : "Gotowe do użytku"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Czy proces jest poprawny? 
                        </td>
                        <td>
                            {state.flowView.isValid === true ? "Tak" : "Nie"}
                        </td>
                    </tr>
                </table>
                <Button className="button-style" onClick={openPopup} >Zakończ</Button>
                <Button className="button-style" onClick={navigateToSteps}>Wróć do poprzedniego etapu</Button>
                {ErrorMessages.getMessage(state.errorCodeMain) !== "" &&
                <Alert color="danger">
                    {ErrorMessages.getMessage(state.errorCodeMain)}
                </Alert>
                }
            </div>
        </div>
    )
}

export default StepSummary;

