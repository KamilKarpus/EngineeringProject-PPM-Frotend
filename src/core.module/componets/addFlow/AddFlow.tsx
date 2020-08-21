import React, { useEffect }  from 'react';
import './AddFlow.css';
import { AppState } from '../../reducers';
import { connect } from "react-redux";
import { MOVED_TO_THE_NEXT_PAGE } from '../../actions/productionFlowActions';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { ErrorMessages } from '../../ErrorMessage';
import LoadingSpinner from '../../../shared/components/Spinner';
import { STEP_CHANGE } from '../../actions/currentStepActions';
import { MENU_CHANGE } from '../../actions/moduleActions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { addProductionFlowAsync } from '../../repositories/Thunk-Actions/StepsThunk-Actions';

interface StateProps{
  isLoading: boolean;
  moveToNextPage: boolean;
  id: string;
  errorCode: number;
}
interface DispatchProps{
    addProductionFlow(name: string) : void;
    menuNextStep() : void;
    changeMenu() : void;
    moveToTheNextPage() : void;

}
type Props = StateProps & DispatchProps;
const AddFlow : React.FC<Props> = (props : Props) => {
  const [newFlow, setNewFlow] = React.useState("");
  const updateNewFlow = () => (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewFlow(e.currentTarget.value);
   
  const history = useHistory();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addProductionFlow(newFlow);
    setNewFlow("");
  };

  useEffect(()=>{
    props.changeMenu();
    props.menuNextStep();
  },[])

  const moveToNextPage = ()=>{
    if(props.moveToNextPage){
      props.moveToTheNextPage();
      history.push(`/flowadd/${props.id}/steps`, {id: props.id});
    }
  }
  moveToNextPage();
  
  return (
  <div className="wrapper">
        {
            props.isLoading &&
                <LoadingSpinner message="Trwa tworzenie przepływu produkcji.."/>
      }
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
    {ErrorMessages.getMessage(props.errorCode) !== "" &&
        <Alert color="danger">
            {ErrorMessages.getMessage(props.errorCode)}
        </Alert>
      }
    </div>
  </div>
  
  );
};
const mapDispatch = (
  dispatch: ThunkDispatch<any, any, AnyAction>
)=> {
  return{
    addProductionFlow:(name: string) =>(
          dispatch(addProductionFlowAsync(name))
      ),
      menuNextStep:()=>(
          dispatch({
            type: STEP_CHANGE,
            payload: 1
          })
      ),
      changeMenu:()=>(
        dispatch({
          type: MENU_CHANGE,
          payload: 1
      })
      ),
      moveToTheNextPage:()=>{
        dispatch({
          type: MOVED_TO_THE_NEXT_PAGE,
        })
      }
  }
}

const mapStateToProps = (store: AppState) => {
  return {
      
      isLoading: store.productionFlow.isLoading,
      errorCode: store.productionFlow.errorCode,
      id: store.productionFlow.id,
      moveToNextPage: store.productionFlow.moveToTheNextPage
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(AddFlow)

