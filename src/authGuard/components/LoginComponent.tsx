import React, { useEffect } from 'react';
import { Modal, Form, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Col, Input, FormFeedback } from 'reactstrap';
import LoadingSpinner from '../../shared/components/Spinner';
import useValidation from '../../shared/forms/rules/useValidation';
import { Field } from '../../shared/forms';
import { StringRequiredRule } from '../../shared/forms/rules/StringRequired';
import { EmailRule } from '../../shared/forms/rules/EmailRule';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getCredientials } from '../redux/thunk/Auth-ThunkActions';
import { AppState } from '../../ReduxConfiguration';

interface StateProps{
    isLoading : boolean;
    userEmail: string;
} 
interface PropsToDispatch{
    getUserCredential(email: string, password: string) : void
}
interface OwnProps {
    isOpen : boolean;
    closePopup() : void;
}

type Props = OwnProps & StateProps & PropsToDispatch;
const Login : React.FC<Props> = (props) =>{
    const [email, setEmail] = React.useState(useValidation<string>("",
        [new StringRequiredRule("Pole E-mail jest wymagane."), new EmailRule("Wprowadź prawidłowy adres E-Mail.")]
    ));

    useEffect(()=>{
        if(props.userEmail){
            props.closePopup();
        }
    },[props.userEmail])

    const [password, setPassword] = React.useState(useValidation<string>("",
        [new StringRequiredRule("Hasło jest wymagane do zalogowania.")]));

    const upadateEmail = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setEmail(
            Field.createField<string>(e.target.value,email)
        );
    }

    const updatePassword = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setPassword(
            Field.createField<string>(e.target.value, password)
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setEmail(Field.validateField(email));
        setPassword(Field.validateField(password));
        if(email.isValid && password.isValid){
            props.getUserCredential(email.value, password.value);
        }
    }
    return(
        <Modal isOpen={props.isOpen} toggle={props.closePopup} size='lg'>
        {
            props.isLoading && <LoadingSpinner message="Trwa logowanie użytkownika..."/>
        }
            <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={props.closePopup}>Nowa paczka</ModalHeader>
                <ModalBody>
                <FormGroup row>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Input type="text" name="email" id="email"
                          value={email.value} onChange={upadateEmail()} 
                          isValid={email.isValid} invalid={!email.isValid}
                           autoComplete="off"  />
                          <FormFeedback className="error_info"> 
                                {email.error}
                          </FormFeedback>
                    </Col>
                    
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={2}>Hasło</Label>
                    <Col sm={10}>
                      <Input type="password" name="password" id="password"
                          value={password.value} onChange={updatePassword()}
                          isValid={password.isValid} invalid={!password.isValid} 
                             />
                          <FormFeedback className="error_info"> 
                                {password.error}
                          </FormFeedback>
                    </Col>
                </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="primary">Zapisz</Button>{' '}
                <Button color="secondary" onClick={props.closePopup}>Anuluj</Button>
              </ModalFooter>
          </Form>
        </Modal>
    )
}

const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        getUserCredential:(email: string, password: string) : void => (
            dispatch(getCredientials(email, password))
        )
    }
  }
  const mapStateToProps = (store: AppState) => {
    return {
        isLoading: store.auth.isLoading,
        userEmail: store.auth.userEmail
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatch
  )(Login);