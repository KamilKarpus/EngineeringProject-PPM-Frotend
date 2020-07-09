import React from 'react';
import './AddFlow.css';
import { AppState } from '../../reducers';
import { useSelector, useDispatch } from "react-redux";
import { ProductionFlow } from '../../types/productionFlow';
import { addProductionFlow, movedToNextPage } from '../../actions/productionFlowActions';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { ErrorMessages } from '../../ErrorMessage';




const AddFlow = () => {
  const [newFlow, setNewFlow] = React.useState("");
  const updateNewFlow = () => (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewFlow(e.currentTarget.value);
   
  const flow: ProductionFlow = useSelector((state: AppState) => state.productionFlow);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProductionFlow(newFlow));
    setNewFlow("");
  };

  const moveToNextPage = ()=>{
    if(flow.moveToTheNextPage){
      dispatch(movedToNextPage());
      history.push('/flow/1/steps');
    }
  }
  moveToNextPage();
  
  return (
  <div>
      <div className="content">
        <p className="header">Tworzenie procesu produkcyjnego</p>
        <Form method="POST"  onSubmit={handleSubmit}>
          <FormGroup >
            <Label for="exampleEmail">Nazwa Procesu Produkcyjnego:</Label>
            <Input type="text" name="name" id="processNameId" placeholder="Nazwa procesu..."
               value={newFlow}
               onChange={updateNewFlow()}/>
          </FormGroup>
          <div className="btn-holder">
          <Button>Rozpocznij</Button>
        </div>
      </Form>
    </div>
      {flow.errorCode !==0 &&
          <Alert color="danger">
            {ErrorMessages.getMessage(flow.errorCode)}
        </Alert>
      }
  </div>
  
  );
};

export default AddFlow;
