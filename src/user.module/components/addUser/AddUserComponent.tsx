import React, { useEffect } from 'react';
import LoadingSpinner from '../../../shared/components/Spinner';
import { UsersState } from '../../types/User';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormFeedback, Input, Col, FormGroup, Label } from 'reactstrap';
import { StringField } from './fields/StringField';
import { EmailField } from './fields/EmailField';
import { PasswordField } from './fields/PasswordField';
import { UserDispatcher } from '../../reducers/UserDispatcher';
import UserRepository from '../../repositories/UserRepository';
type Props = {
    closePopup() : void;
    isOpen : boolean;
}
const AddUserComponent = (props: Props) =>{
    const {isOpen} = props;
    const dispatch = useDispatch();
    const repository = new UserRepository();
    const dispatcher = new UserDispatcher(dispatch, repository);
    const state: UsersState = useSelector((state: AppState) => state.users);
    const [firstName, setFirstName] = React.useState<StringField>(StringField.initial);
    const [lastName, setLastName] = React.useState<StringField>(StringField.initial);
    const [jobPosition, setJobPosition] = React.useState<StringField>(StringField.initial);
    const [email, setEmail] = React.useState<EmailField>(EmailField.initial);
    const [password, setPassword] = React.useState<PasswordField>(PasswordField.initial);

    useEffect(()=>{
        if(state.fetchNeeded === true){
            props.closePopup();
        }
    },[state.fetchNeeded]);
    const updateEmail = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        let field = EmailField.create(e.target.value);
        setEmail(field);
      }
    const updateJobPosition = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        let field = StringField.create(e.target.value);
        setJobPosition(field);
    }
    const updateLastName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        let field = StringField.create(e.target.value);
        setLastName(field);
    }
    const updateFirstName = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        let field = StringField.create(e.target.value);
        setFirstName(field);
    }
    const updatePassword = () => (e: React.ChangeEvent<HTMLInputElement>) =>{
      e.preventDefault();
      let field = PasswordField.create(e.target.value);
      setPassword(field);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setEmail(EmailField.create(email.value));
        setPassword(PasswordField.create(password.value));
        setLastName(StringField.create(lastName.value));
        setFirstName(StringField.create(firstName.value));
        setJobPosition(StringField.create(jobPosition.value));
        if(email.valid() && password.valid() && firstName.valid() && 
            lastName.valid() && jobPosition.valid()){
                console.log("test");
                dispatcher.addNewUser(email.value, password.value, 
                    firstName.value, lastName.value, jobPosition.value);
        }
        }
    return (
        <Modal isOpen={isOpen} toggle={props.closePopup} size='lg'>
            {
                state.isLoading && <LoadingSpinner message="Trwa dodawanie nowego użytkownika"/>
            }
        <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={props.closePopup}>Dodaj nowego użytkownika</ModalHeader>
            <ModalBody>
                <FormGroup row>
                    <Label for="email" sm={2}>Login</Label>
                    <Col sm={10}>
                        <Input type="text" name="email" id="email"
                          value={email?.value} onChange={updateEmail()} maxlength="50"
                          valid= {email.valid()} 
                          invalid={email.invalid()} 
                        />
                        <FormFeedback className="error_info"> 
                            { email.error }
                        </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={2}>Hasło</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="password"
                          value={password.value} onChange={updatePassword()} maxlength="50"
                          valid= {password.valid()} 
                          invalid={password.invalid()} 
                        />
                        <FormFeedback className="error_info"> 
                            { password.error}
                        </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="firstName" sm={2}>Imię</Label>
                    <Col sm={10}>
                        <Input type="text" name="firstName" id="firstName"
                          value={firstName.value} onChange={updateFirstName()} maxlength="50"
                          valid= {firstName.valid()} 
                          invalid={firstName.invalid()} 
                        />
                        <FormFeedback className="error_info"> 
                            { firstName.error}
                        </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="surname" sm={2}>Nazwisko</Label>
                    <Col sm={10}>
                        <Input type="text" name="surname" id="surname"
                          value={lastName.value} onChange={updateLastName()} maxlength="50"
                          valid= {lastName.valid()} 
                          invalid={lastName.invalid()} 
                        />
                        <FormFeedback className="error_info"> 
                            { lastName.error }
                        </FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="jobPosition" sm={2}>Stanowisko</Label>
                    <Col sm={10}>
                        <Input type="text" name="jobPosition" id="jobPosition"
                          value={jobPosition.value} onChange={updateJobPosition()} maxlength="50"
                          valid= {jobPosition.valid()} 
                          invalid={jobPosition.invalid()} 
                        />
                        <FormFeedback className="error_info"> 
                            { jobPosition.error }
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
export default AddUserComponent;