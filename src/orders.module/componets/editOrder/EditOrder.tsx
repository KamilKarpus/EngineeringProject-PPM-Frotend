import React, { useEffect } from 'react';
import LoadingSpinner from '../../../shared/components/Spinner';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Form, FormGroup, Col, Label, FormFeedback, Input, Button } from 'reactstrap';
import { NameField } from './fields/OrderNameField';
import DatePicker, { registerLocale } from "react-datepicker";
import pl from 'date-fns/locale/pl';
import "react-datepicker/dist/react-datepicker.css";
import { DateField } from './fields/DateField';
import { OrderState } from '../../types/Order';
import { AppState } from '../../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../actions/OrderActions';

registerLocale('pl', pl)

type Props = {
    closePopup() : void;
};

const EditOrder : React.FC<Props> = (props)=>{
    const dispatch = useDispatch();
    const [orderName, setOrderName] = React.useState<NameField>(NameField.initial);
    const [dateValue, setDateValue] = React.useState<DateField>(DateField.initial);
    const [description, setValue] = React.useState("");
    const state: OrderState = useSelector((state: AppState) => state.orderState);
    
    const updateOrderName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setOrderName(NameField.create(e.target.value));
      }
      const updateDescription = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setValue(e.target.value);
      }
      useEffect(()=>{
          if(state.fetchNeeded){
            props.closePopup();
          }
      }, [state.fetchNeeded]);
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setOrderName(NameField.create(orderName.value));
        setDateValue(DateField.create(dateValue.value));
        if(orderName.valid() && dateValue.valid()){
              dispatch(addOrder(orderName.value,dateValue.value,
                description));
          }
        }

    return (
        <div className='popup'>
            <div>
            {
              state.isLoading &&
                <LoadingSpinner message="Trwa tworzenie nowego zamówienia..."/>
              }
            </div>
            <div className='popup_inner'>
              <div className="header">
                  Utwórz nowe zamówienie
                   <a onClick={props.closePopup}> <AiFillCloseCircle className="close_buton" size="35"/> </a>
               </div>
                <Form className="form" onSubmit={handleSubmit}>
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
                <Button>Zapisz</Button>
                </Form>
             </div>
            </div>
        );
}
export default EditOrder;

