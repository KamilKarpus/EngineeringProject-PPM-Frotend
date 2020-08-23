import React, { useEffect } from 'react';
import LoadingSpinner from '../../../shared/components/Spinner';
import { Form, FormGroup, Col, Label, Input, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { AppState } from '../../reducers';
import { connect } from 'react-redux';
import { FlowField } from './fields/FlowField';
import AutoComplete from './AutoComplete';
import { FlowView } from '../../models/FlowView';
import { NumericField } from './fields/NumericField';
import { WidthMessage, HeightMessage, WeightMessage } from './ValidateMessages';
import { useHistory } from 'react-router-dom';
import { addPackageAsync } from '../../repositories/thunk-actions/OrderActions-Thunk';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchFlows } from '../../repositories/thunk-actions/FlowActions-Thunk';
import { ErrorMessage } from '../../ErrorMessage';

interface StateProps{
  fetchNeeded: boolean;
  isLoading: boolean;
  errorCode: number;
  getErrorMessage(code: number) : string;
}
interface DispatchProps{
  addPackage(flowId: string,weight: number,height: number,width: number, orderId : string) : void;
  getFlows(name: string) : Promise<FlowView[]>;
}

interface OwnProps {
  closePopup() : void;
  isOpen : boolean;
};

type Props = OwnProps & StateProps & DispatchProps;
const EditPackage : React.FC<Props> = (props)=>{
    const history = useHistory();
    const [flow, setFlow] = React.useState<FlowField>(FlowField.Initial);
    const [height, setHeight] = React.useState<NumericField>(NumericField.initial);
    const [width, setWidth] = React.useState<NumericField>(NumericField.initial);
    const [weight, setWeight] = React.useState<NumericField>(NumericField.initial);

    const updateFlowField = (locationView : FlowView) : void =>{
      const newField = FlowField.Create(locationView);
      setFlow(newField);
    }
    const updateWidth = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
      e.preventDefault();
      setWidth(NumericField.create(e.target.value, WidthMessage));
    }

    const updateHeight = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
      e.preventDefault();
      setHeight(NumericField.create(e.target.value, HeightMessage));
    }

    const updateWeight = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
      e.preventDefault();
      setWeight(NumericField.create(e.target.value, WeightMessage));
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
      
        setWidth(NumericField.createFromNumber(width.value, WidthMessage));
        setHeight(NumericField.createFromNumber(height.value, HeightMessage));
        setWeight(NumericField.createFromNumber(weight.value, WeightMessage));
        setFlow(FlowField.Create(flow.value));
        if(width.valid() && height.valid() && width.valid() && flow.valid()){
          props.addPackage(flow.value.id, weight.value, height.value,
            width.value, history.location.state.id);
        }
      }
    
      const loadItems = (name : string) : Promise<FlowView[]> =>{
          return props.getFlows(name);
      }
    
      useEffect(()=>{
        if(props.fetchNeeded === true){
          props.closePopup();
        }
      },[props.fetchNeeded])
    return (
      <Modal isOpen={props.isOpen} toggle={props.closePopup} size='lg'>
            {
                props.isLoading && <LoadingSpinner message="Trwa tworzenie nowej paczki..."/>
            }
        <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={props.closePopup}>Nowa paczka</ModalHeader>
            <ModalBody>
                <FormGroup row>
                    <Label for="height" sm={2}>Wysokość [m]</Label>
                    <Col sm={10}>
                      <Input type="number" name="height" id="heightId"
                          value={height?.value} onChange={updateHeight()} 
                          valid= {height.valid()} 
                          invalid={height.invalid()}  />
                          <FormFeedback className="error_info"> 
                            {height.error}
                          </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="width" sm={2}>Szerekość [m]</Label>
                    <Col sm={10}>
                      <Input type="number" name="width" id="widthId"
                          value={width?.value} onChange={updateWidth()} 
                          valid= {width.valid()} 
                          invalid={width.invalid()} />
                          <FormFeedback className="error_info"> 
                            {width.error}
                          </FormFeedback>
                    </Col>
                    
                </FormGroup>
                <FormGroup row>
                    <Label for="weight" sm={2}>Waga [kg]</Label>
                    <Col sm={10}>
                      <Input type="number" name="weight" id="weight"
                          value={weight?.value} onChange={updateWeight()} 
                          valid= {weight.valid()} 
                          invalid={weight.invalid()} />
                          <FormFeedback className="error_info"> 
                            {weight.error}
                          </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="flow" sm={2}>Proces Produkcyjny</Label>
                    <Col sm={10}>
                      <AutoComplete loadItems={loadItems} updateFlow={updateFlowField} invalid={flow.invalid()} valid={flow.valid()} />
                      <div className="error-info invalid-feedback d-block">
                        {flow.error}
                      </div>
                    </Col>
                </FormGroup>
                {props.errorCode > 0 &&
                <Alert color="danger">
                    {props.getErrorMessage(props.errorCode)}
                </Alert>
                }
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
    addPackage: (flowId: string,weight: number,height: number,width: number, orderId : string)  => (
          dispatch(addPackageAsync(flowId, weight, height, width, orderId))
      ),
    getFlows: (name: string) =>(
      dispatch(fetchFlows(name))
    )
  }
}

const mapStateToProps = (store: AppState) => {
  const errors = new ErrorMessage();
  return {
      isLoading: store.orderState.isLoading,
      fetchNeeded: store.orderState.fetchNeeded,
      errorCode: store.orderState.errorCode,
      getErrorMessage: (code: number) : string=>{
        return errors.getMessage(code);
      }
      
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(EditPackage)