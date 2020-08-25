import React, { useEffect } from 'react';
import { Button, Alert } from 'reactstrap';
import './StepSummary.css';
import { useHistory } from 'react-router-dom';
import AlertComponent from '../../../shared/components/alerts/AlertComponent';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';
import { FlowView } from '../../models/FlowView';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchFlow, finishFlow } from '../../repositories/Thunk-Actions/StepsThunk-Actions';
import { STEP_CHANGE } from '../../actions/currentStepActions';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';

interface StateProps{
    isLoading: boolean;
    fetchNeeded: boolean;
    flowView: FlowView;
    errorCodeMain: number;
  }
interface DispatchProps{
    getFlow(id: string) : void;
    finishFlow(id: string) : void;
    menuNextStep() : void;
    getErrorMessage(code: number) : string;
}
  
type Props = StateProps & DispatchProps;
const StepSummary : React.FC<Props> = (props) =>{
    const [isOpen, setOpen] = React.useState(false);
    const [answer, setAnswer] = React.useState(false);
    const closePopup = () =>{
        setOpen(false);
    }
    const openPopup = () =>{
        setOpen(true);
    } 
    const history = useHistory();
    useEffect(()=>{
        props.menuNextStep();
    },[]);
    useEffect(()=>{
        props.getFlow(history.location.state.id);
    },[props.fetchNeeded])

    
    const navigateToSteps= () =>{
        history.push(`/flowadd/${history.location.state.id}/steps`, {id: history.location.state.id});
      }
    const answerChange = (value : boolean) =>{
        setAnswer(value);
    }

    if(answer){
        props.finishFlow(history.location.state.id);
        setAnswer(false);
        if(props.flowView.isValid){
            history.push('/flow');
        }
    }
    return(
        <div className="wrapper">
            {  props.isLoading &&
                <LoadingSpinner message="Zapisywanie przepływu produkcji..."/>}
            {isOpen ? <AlertComponent closePopup={closePopup} header="Potwierdzenie ukończenia" message="Zakończenie tego etapu spowoduje, że proces przejedzie w status aktywny. Czy jesteś pewień że chcesz zakończyć proces budowania?" setAnswer={answerChange}/> : null}
            <div>
                <h1>Podsumowanie procesu produkcyjnego {props?.flowView.name}</h1>
                <table>
                    <tr>
                        <td>
                            Liczba dni potrzebnych na ukończenie:
                        </td>
                        <td>
                            {props?.flowView.requiredDaysToFinish}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Status:
                        </td>
                        <td>
                            {props?.flowView.statusId === 1 ? "W budowie" : "Gotowe do użytku"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Czy proces jest poprawny? 
                        </td>
                        <td>
                            {props?.flowView.isValid === true ? "Tak" : "Nie"}
                        </td>
                    </tr>
                </table>
                <Button className="button-style" onClick={openPopup} >Zakończ</Button>
                <Button className="button-style" onClick={navigateToSteps}>Wróć do poprzedniego etapu</Button>
                {props.errorCodeMain > 0 &&
                <Alert color="danger">
                    {props.getErrorMessage(props.errorCodeMain)}
                </Alert>
                }
            </div>
        </div>
    )
}

const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    const errors = new ErrorMessages();
    return{
        getFlow:(id: string) =>(
            dispatch(fetchFlow(id))
        ),
        finishFlow:(id: string)=>(
            dispatch(finishFlow(id))
        ),
        menuNextStep:()=>(
            dispatch(
                {
                    type: STEP_CHANGE,
                    payload: 3
                })
        ),
        getErrorMessage:(code: number) : string=>{
            return errors.getMessage(code);
          },
    }
  }
  
  const mapStateToProps = (store: AppState) => {
    return {
        
        isLoading: store.stepsState.isLoading,
        errorCodeMain: store.stepsState.errorCodeMain,
        flowView: store.stepsState.flowView
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatch
  )(StepSummary)

