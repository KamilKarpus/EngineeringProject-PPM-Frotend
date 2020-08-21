import React, { useEffect } from 'react';
import StepFormPopup from '../stepFormPopup/StepFormPopup';
import { Button, Table, Alert } from 'reactstrap';
import './AddSteps.css';
import {  connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../reducers';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { Step } from '../../models/StepView';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';
import { STEP_CHANGE } from '../../actions/currentStepActions';
import { FlowView } from '../../models/FlowView';
import { fetchFlow, changePositionAsync } from '../../repositories/Thunk-Actions/StepsThunk-Actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface StateProps{
  isLoading: boolean;
  fetchNeeded: boolean;
  flowView: FlowView;
  errorCodeMain: number;
  loadingMessage: string;
}
interface DispatchProps{
  getFlow(id: string) : void;
  menuNextStep() : void;
  changePosition(flowId : string, stepId: string, stepNumber: number) : void;

}

type Props = StateProps & DispatchProps;


const AddSteps : React.FC<Props>= (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const history = useHistory();
  const openPopup = () =>{
    setOpen(true);
  } 

  useEffect(() => {
    props.menuNextStep();
    props.getFlow(history.location.state.id);
  },[]); 

  if(props.fetchNeeded){
    props.getFlow(history.location.state.id);
  }
  const descentStepPostion = async (step : Step) =>
  {
    let stepNumber = step.number +1;
    await props.changePosition(history.location.state.id,step.stepId, stepNumber);
    
  }
  const ascentStepPosition = async (step : Step) =>{
    let stepNumber = step.number - 1;
    await props.changePosition(history.location.state.id,step.stepId, stepNumber);
  }
  const closePopup = () =>{
    setOpen(false);
  }
  const navigateToSummary = () =>{
    history.push(`/flowadd/${history.location.state.id}/summary`, {id: history.location.state.id});
  }
  return (
    <div className="content_table">
      {
            props.isLoading &&
                <LoadingSpinner message={props.loadingMessage}/>
      }
      {ErrorMessages.getMessage(props.errorCodeMain) !== "" &&
          <Alert color="danger">
              {ErrorMessages.getMessage(props.errorCodeMain)}
          </Alert>
      }
      <div>
        <Button onClick={openPopup} className="button-style">Utwórz nowy etap produkcji</Button>
        <Button color="primary" onClick={navigateToSummary} disabled={false} className="button-style">Przejdź dalej</Button>
      </div>
      <div>
        {
          isOpen && <StepFormPopup closePopup={closePopup} isOpen={isOpen} /> 
        }
      </div>
      <Table striped>
      <thead>
        <tr>
          <th>Numer</th>
          <th>Nazwa Etapu</th>
          <th>Lokalizacja</th>
          <th>Procent</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {props.flowView.steps.map(step => (
        <tr>
          <th scope="row">{step.number}</th>
          <td>{step.stepName}</td>
          <td>{step.locationName}</td>
          <td>{step.percentage}%</td>
          <td>
            {step.number !== props.flowView.steps.length ?  <AiOutlineArrowDown onClick={() => {descentStepPostion(step)}}/>  : null}
          </td>
          <td>
            {step.number !== 1 ? <AiOutlineArrowUp onClick={()=> {ascentStepPosition(step)}}/> : null}
          </td>
        </tr>
        ))
      }
      </tbody>
    </Table>
    </div>
  )
};
const mapDispatch = (
  dispatch: ThunkDispatch<any, any, AnyAction>
)=> {
  return{
      getFlow:(id: string) =>(
          dispatch(fetchFlow(id))
      ),
      menuNextStep:()=>(
          dispatch(
              {
                  type: STEP_CHANGE,
                  payload: 2
              })
      ),
      changePosition: (flowId : string, stepId: string, stepNumber: number)=>{
        dispatch(changePositionAsync(flowId,stepId, stepNumber))
      }
  }
}

const mapStateToProps = (store: AppState) => {
  return {
      
      isLoading: store.stepsState.isLoading,
      errorCode: store.stepsState.errorCode,
      flowView: store.stepsState.flowView,
      loadingMessage: store.stepsState.loadingMessage,
      fetchNeeded: store.stepsState.fetchNeeded
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(AddSteps)

