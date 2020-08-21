import React, { useEffect } from 'react';
import LoadingSpinner from '../../../shared/components/Spinner';
import { Form, FormGroup, Col, Label, FormFeedback, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NameField } from './fields/OrderNameField';
import DatePicker, { registerLocale } from "react-datepicker";
import pl from 'date-fns/locale/pl';
import "react-datepicker/dist/react-datepicker.css";
import { DateField } from './fields/DateField';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addOrderAsync } from '../../repositories/thunk-actions/OrderActions-Thunk';
import { AddOrder } from '../../models/AddOrder';

registerLocale('pl', pl)

interface StateProps{
    fetchNeeded: boolean;
    isLoading: boolean;
}
interface DispatchProps{
    addOrder(companyName : string, deliveryDate : Date, description : string) : void;
}

interface OwnProps {
    closePopup() : void;
    isOpen : boolean;
};

type Props = OwnProps & StateProps & DispatchProps;

const EditOrder : React.FC<Props> = (props)=>{
    const [orderName, setOrderName] = React.useState<NameField>(NameField.initial);
    const [dateValue, setDateValue] = React.useState<DateField>(DateField.initial);
    const [description, setValue] = React.useState("");
    
    const updateOrderName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setOrderName(NameField.create(e.target.value));
      }
      const updateDescription = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setValue(e.target.value);
      }
      useEffect(()=>{
          if(props.fetchNeeded){
            props.closePopup();
          }
      }, [props.fetchNeeded]);
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setOrderName(NameField.create(orderName.value));
        setDateValue(DateField.create(dateValue.value));
        if(orderName.valid() && dateValue.valid()){
            props.addOrder(orderName.value, dateValue.value, description);
          }
        }

    return (
      <Modal isOpen={props.isOpen} toggle={props.closePopup} size='lg'>
      {
          props.isLoading && <LoadingSpinner message="Trwa tworzenie nowego zamówienia..."/>
      }
    <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={props.closePopup}>Nowe zamówienie</ModalHeader>
          <ModalBody>
                <FormGroup row>
                    <Label for="orderClientName" sm={2}>Nazwa Klienta</Label>
                    <Col sm={10}>
                        <Input type="text" name="clientName" id="clientName"
                          value={orderName?.value} onChange={updateOrderName()} maxlength="50"
                          valid= {orderName.valid()} 
                          invalid={orderName.invalid()} 
                        />
                        <FormFeedback className="error_info"> 
                            { orderName.error}
                        </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="orderDate" sm={2}>Koniec</Label>
                    <Col sm={10}>
                    <DatePicker
                        selected={dateValue.value}
                        onChange={date=> setDateValue(DateField.create(date as Date))}
                        locale={'pl'}
                        className={`${dateValue.invalid() === true ? 'is-invalid' : 'is-valid'} form-control`}
                        dateFormat="P"
                      />
                    <div className="error-info invalid-feedback d-block">
                        {dateValue.error}
                    </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="description" sm={2}>Opis</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="tedescription" id="descriptionId"
                        onChange={updateDescription()}
                        value={description} />
                    </Col>
                </FormGroup>
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
    addOrder: (companyName : string, deliveryDate : Date, description : string) => (
          dispatch(addOrderAsync(new AddOrder(companyName, deliveryDate, description)))
      )
  }
}

const mapStateToProps = (store: AppState) => {
  return {
      isLoading: store.orderState.isLoading,
      fetchNeeded: store.orderState.fetchNeeded
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(EditOrder)

