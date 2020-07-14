import React, { useEffect } from 'react';
import StepFormPopup from '../stepFormPopup/StepFormPopup';
import { Button, Table } from 'reactstrap';
import './AddSteps.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFlow } from '../../actions/StepsAction';
import { useHistory } from 'react-router-dom';
import { StepsState } from '../../types/Step';
import { AppState } from '../../reducers';
const AddSteps = () => {
  const [isOpen, setOpen] = React.useState(false);
  const history = useHistory();
  const openPopup = () =>{
    setOpen(true);
  } 
  const dispatch = useDispatch();
  const state: StepsState = useSelector((state: AppState) => state.stepsState);
  useEffect(() => {
    dispatch(getFlow(history.location.state.id));
  },[]); 

  if(state.fetchNeeded){
    dispatch(getFlow(history.location.state.id));
  }

  const closePopup = () =>{
    setOpen(false);
  }
  return (
    <div className="content_table">
      <Button onClick={openPopup}>Utwórz nowy etap produkcji</Button>
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
        </tr>
      </thead>
      <tbody>
      {state.flowView.steps.map(step => (
        <tr>
          <th scope="row">{step.number}</th>
          <td>{step.stepName}</td>
          <td>{step.locationName}</td>
          <td>{step.percentage}%</td>
        </tr>
        ))
      }
      </tbody>
    </Table>
    </div>
  )
};

export default AddSteps;
