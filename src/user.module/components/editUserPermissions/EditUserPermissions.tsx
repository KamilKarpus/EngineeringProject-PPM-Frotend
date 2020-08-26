import React, { useEffect } from 'react';
import { Modal, Form, ModalHeader, ModalBody, FormGroup, Input, ModalFooter, Button } from 'reactstrap';
import LoadingSpinner from '../../../shared/components/Spinner';
import { AppState } from '../../reducers';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UserView } from '../../models/UserView';
import { fetchUserById, updateUserPermissions } from '../../repositories/thunk-actions/UserActions';
import { TranslateService } from './TranslateService';
import PermissionView from './PermissionView';
interface StateProps{
    fetchNeeded: boolean;
    isLoading: boolean;
}
interface DispatchProps{
    getUser(userId: string) : Promise<UserView>,
    updatePermissions(userId : string, permissions: PermissionView) : void
}

interface OwnProps {
    closePopup() : void;
    isOpen : boolean;
    userId : string;
};

type Props = StateProps & DispatchProps & OwnProps;

const EditUserPermissions : React.FC<Props> = (props) =>{
    const [viewChecked, setViewChecked] = React.useState(false);
    const [editFlowPermissions, setEditFlowPermissions] = React.useState(false);
    const [operator, setOperator] = React.useState(false);
    const [editLocation, setEditLocation] = React.useState(false);
    const [manageUsers, setManageUsers] = React.useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        var permissions = new PermissionView();
        permissions.View = viewChecked;
        permissions.ManageUsers = manageUsers;
        permissions.EditFlow = editFlowPermissions;
        permissions.EditLocation = editLocation;
        permissions.CanExecuteFlow = operator;
        props.updatePermissions(props.userId, permissions);

    }

    useEffect(()=>{
       props.getUser(props.userId).then(user=>{
        const service = new TranslateService(user.permissions);
        const model = service.translate();
        setViewChecked(model.View);
        setEditFlowPermissions(model.EditLocation);
        setOperator(model.CanExecuteFlow);
        setEditLocation(model.EditLocation);
        setManageUsers(model.ManageUsers);
       })
    }, [props.userId]);

    const editView = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setViewChecked(e.target.checked);
    }
    const updateEditFlow = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEditFlowPermissions(e.target.checked);
    }
    const updateOperator= (e: React.ChangeEvent<HTMLInputElement>)=>{
        setOperator(e.target.checked);
    }
    const updateEditLocation= (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEditLocation(e.target.checked);
    }
    const updateManageUsers= (e: React.ChangeEvent<HTMLInputElement>)=>{
        setManageUsers(e.target.checked);
    }
    return(
    <Modal isOpen={props.isOpen} toggle={props.closePopup}>
    {
        props.isLoading && <LoadingSpinner message="Trwa aktualizacja uprawnień..."/>
    }
      <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={props.closePopup}>Edycja uprawnień użytkownika</ModalHeader>
            <ModalBody className="p-5">
                <FormGroup>
                        <Input type="checkbox" name="ViewPermissions" id="ViewPermissions" 
                        checked={viewChecked} onChange={editView}/> {' '} Widok
                </FormGroup>
                <FormGroup>
                          <Input type="checkbox" name="EditFlow" id="EditFlowPermissions"
                          checked={editFlowPermissions} onChange={updateEditFlow}/> { ' '} Zarządzanie przepływem produkcji
                </FormGroup>
                <FormGroup>
                          <Input type="checkbox" name="operator" id="operator"
                          checked={operator} onChange={updateOperator}/> { ' '} Operator
                </FormGroup>
                <FormGroup>
                          <Input type="checkbox" name="editLocation" id="editLocation"
                          checked={editLocation} onChange={updateEditLocation}/> {' '} Zarządzanie lokalizacji
                </FormGroup>
                <FormGroup>
                          <Input type="checkbox" name="manageUsers" id="manageUsers"
                          checked={manageUsers} onChange={updateManageUsers}/> {' '} Zarządzanie użytkownikami
                </FormGroup>
                <ModalFooter>
                  <Button color="primary">Zapisz</Button>{' '}
                  <Button color="secondary" onClick={props.closePopup}>Anuluj</Button>
                </ModalFooter>
                </ModalBody>
            </Form>
          </Modal>
    );
}

const mapDispatch = (
    dispatch: ThunkDispatch<AppState, any, AnyAction>
  )=> {
    return{
        getUser: (userId: string) =>(
            dispatch(fetchUserById(userId))
        ),
        updatePermissions:(userId : string, permissions: PermissionView) =>(
            dispatch(updateUserPermissions(userId, permissions))
        )
    }
  }
  
  const mapStateToProps = (store: AppState) => {
    return {
        fetchNeeded: store.users.fetchNeeded,
        isLoading: store.users.isLoading
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatch
  )(EditUserPermissions);