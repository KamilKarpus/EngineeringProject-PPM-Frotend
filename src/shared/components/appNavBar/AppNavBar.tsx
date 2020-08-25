import React, { useState } from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import Login from '../../../authGuard/components/LoginComponent';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Logout from './Logout';
import { AppState } from '../../../ReduxConfiguration';
import { LOGOUT } from '../../../authGuard/redux/Actions';
interface StateProps{
    email: string;
}
interface PropsToDispatch{
  logout() : void;
}
type Props = StateProps & PropsToDispatch;
const AppNavbar : React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => setIsOpen(true);
    const closePupup = () => setIsOpen(false);
    return (
      <div>
        {
          isOpen && <Login isOpen={isOpen} closePopup = {closePupup}/>
        }
        <Navbar color="light" light>
          <NavbarBrand href="/">Strona główna</NavbarBrand>
        {!props.email && 
          <Button color="link" className="my-2 my-sm-0" onClick={openPopup }>Zaloguj</Button>
        }
        {
          props.email &&
          <Logout email={props.email} logout={props.logout}/>
        }
        </Navbar>
      </div>
    );
  }
  const mapDispatch = (
    dispatch: ThunkDispatch<any, any, AnyAction>
  )=> {
    return{
        logout:() => (
          dispatch({
            type: LOGOUT
          })
        )
    }
  }
  const mapStateToProps = (store: AppState) => {
    return {
        email: store.auth.userEmail
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatch
  )(AppNavbar);
