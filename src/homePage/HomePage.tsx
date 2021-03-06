import React from 'react';
import {Button, CardColumns } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../ReduxConfiguration';
import { hasBasename } from 'history/PathUtils';
import { EditLocation, ManageUsers, EditFlow } from '../user.module/models/PermissionService';
interface StateProps{
    hasAccess(permission: string) : boolean;
}
type Props = StateProps;
const HomePage : React.FC<Props> = (props) =>{
    const history = useHistory();
    const moveToPage = (path : string) : void =>{
        history.push(path);
    }
    return(
    <div className="w-100 h-100 p-3 d-flex justify-content-center">
    <div>    
        <div className="card text-white bg-primary mb-3">
            <div className="card-header">Zamówienia</div>
                <div className="card-body">
                    <h5 className="card-title">Zarządzaj zamówienia</h5>
                    <p className="card-text">Po przejściu na tą stronę możliwe jest dodawanie nowych paczek do zamówień, przeglądanie zamówień oraz zarządzenia nimi.</p>
                    <Button onClick={()=>moveToPage("/orders")}>Idź do Zamówień</Button>
                </div>
            </div>
        {props.hasAccess(EditLocation) &&
        <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Lokalizacje</div>
                <div className="card-body">
                <h5 className="card-title">Zarządzenie lokalizacjami</h5>
                <p className="card-text">Po przejściu na tą stronę możliwe jest tworzenie nowych lokalizacji oraz przeglądanie instniejących lokalizacji.</p>
                <Button color="primary" onClick={()=>moveToPage("/locations")}>Idź do lokalizacji</Button>
            </div>
        </div>
        }
        {props.hasAccess(ManageUsers) &&
        <div className="card text-white bg-info mb-3">
            <div className="card-header">Użytkownicy</div>
                <div className="card-body">
                    <h5 className="card-title">Zarządzaj użytkownikami.</h5>
                    <p className="card-text">Po przejściu na tą stronę mozliwe jest dodawanie nowych użytkowników do systemów oraz zarządzanie ich uprawnieniami.</p>
                    <Button onClick={()=>moveToPage("/users")}>Idź do Użytkowników</Button>
                </div>
            </div>
        }
        {props.hasAccess(EditFlow) &&
        <div className="card text-white bg-dark mb-3">
            <div className="card-header">Administracja</div>
            <div className="card-body">
                <h5 className="card-title">Administracja procesem produkcji</h5>
                <p className="card-text">Po przejkściu na tę stronę możliwe jest zarządzenie procesem produkcyjnym.</p>
                <Button onClick={()=>moveToPage("/flow")}>Idź do Administracja</Button>
            </div>
        </div>
    }
    </div>
    </div>
    )
}

const mapStateToProps = (store: AppState) => {
    
    return {
        hasAccess: (permission : string) : boolean=>{
           const right = store.auth.permissions.find(p=> permission === p);
           return right ? true : false;
        }
    };
  };

  export default connect(
    mapStateToProps  
  )(HomePage)
