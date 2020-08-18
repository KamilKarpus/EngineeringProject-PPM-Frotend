import React, { useEffect } from 'react';
import LoadingSpinner from '../../../shared/components/Spinner';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Form, FormGroup, Col, Label, Input, Button, FormFeedback } from 'reactstrap';
import { OrderState } from '../../types/Order';
import { AppState } from '../../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { FlowField } from './fields/FlowField';
import { FlowRepository } from '../../repositories/FlowRepository';
import AutoComplete from './AutoComplete';
import { FlowView } from '../../models/FlowView';
import { NumericField } from './fields/NumericField';
import { WidthMessage, HeightMessage, WeightMessage } from './ValidateMessages';
import { PackageDispatcher } from './EditPackageDispatcher';
import { useHistory } from 'react-router-dom';

type Props = {
    closePopup() : void;
};

const EditPackage : React.FC<Props> = (props)=>{

    const history = useHistory();

    const dispatch = useDispatch();
    const dispatcher = new PackageDispatcher(dispatch);

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
    const state: OrderState = useSelector((state: AppState) => state.orderState);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
      
        setWidth(NumericField.createFromNumber(width.value, WidthMessage));
        setHeight(NumericField.createFromNumber(height.value, HeightMessage));
        setWeight(NumericField.createFromNumber(weight.value, WeightMessage));
        setFlow(FlowField.Create(flow.value));
        if(width.valid() && height.valid() && width.valid() && flow.valid()){
          dispatcher.addPackage(flow.value.id, weight.value, height.value,
            width.value, history.location.state.id);
        }
      }
    
      const loadItems = (name : string) : Promise<FlowView[]> =>{
        const repository = new FlowRepository();
        return repository.GetFlow(name);
      }
    
      useEffect(()=>{
        if(state.fetchNeeded === true){
          props.closePopup();
        }
      },[state.fetchNeeded])
    return (
        <div className='popup'>
            <div>
            {
              state.isLoading &&
                <LoadingSpinner message="Trwa dodawanie nowej pozycji do zamówienia..."/>
              }
            </div>
            <div className='popup_inner'>
              <div className="header">
                  Dodaj nową paczkę do zamówienia
                   <a onClick={props.closePopup}> <AiFillCloseCircle className="close_buton" size="35"/> </a>
               </div>
                <Form className="form" onSubmit={handleSubmit}>
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
                <Button>Zapisz</Button>
                </Form>
             </div>
            </div>
        );
}
export default EditPackage;