import React, { useEffect } from 'react';
import StepFormPopup from '../stepFormPopup/StepFormPopup';
import { Button, Table, Alert } from 'reactstrap';
import './AddSteps.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFlow, changePosition } from '../../actions/StepsAction';
import { useHistory } from 'react-router-dom';
import { StepsState } from '../../types/Step';
import { AppState } from '../../reducers';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { Step } from '../../models/StepView';
import LoadingSpinner from '../../../shared/components/Spinner';
import { ErrorMessages } from '../../ErrorMessage';
import { STEP_CHANGE } from '../../actions/currentStepActions';
const AddSteps = () => {
  const [isOpen, setOpen] = React.useState(false);
  const history = useHistory();
  const openPopup = () =>{
    setOpen(true);
  } 
  const dispatch = useDispatch();
  const state: StepsState = useSelector((state: AppState) => state.stepsState);
  useEffect(() => {
    dispatch({
      type: STEP_CHANGE,
      payload: 2
    });
    dispatch(getFlow(history.location.state.id));
  },[]); 

  if(state.fetchNeeded){
    dispatch(getFlow(history.location.state.id));
  }
  const descentStepPostion = async (step : Step) =>
  {
    let stepNumber = step.number +1;
    await dispatch(changePosition(history.location.state.id,step.stepId, stepNumber));
    
  }
  const ascentStepPosition = async (step : Step) =>{
    let stepNumber = step.number - 1;
    await dispatch(changePosition(history.location.state.id,step.stepId, stepNumber));
  }
  const closePopup = () =>{
    setOpen(false);
  }
  const navigateToSummary = () =>{
    history.push(`/flow/${history.location.state.id}/summary`, {id: history.location.state.id});
  }
  return (
    <div className="content_table">
      {
            state.isLoading &&
                <LoadingSpinner message={state.loadingMessage}/>
      }
      {ErrorMessages.getMessage(state.errorCodeMain) !== "" &&
          <Alert color="danger">
              {ErrorMessages.getMessage(state.errorCodeMain)}
          </Alert>
      }
      <div>
        <Button onClick={openPopup} className="button-style">Utwórz nowy etap produkcji</Button>
        <Button color="primary" onClick={navigateToSummary} disabled={false} className="button-style">Przejdź dalej</Button>
      </div>
      <div>
        {
          isOpen ? <StepFormPopup closePopup={closePopup} /> : null
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
      {state.flowView.steps.map(step => (
        <tr>
          <th scope="row">{step.number}</th>
          <td>{step.stepName}</td>
          <td>{step.locationName}</td>
          <td>{step.percentage}%</td>
          <td>
            {step.number !== state.flowView.steps.length ?  <AiOutlineArrowDown onClick={() => {descentStepPostion(step)}}/>  : null}
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

export default AddSteps;
