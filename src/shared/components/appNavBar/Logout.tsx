import React from 'react';
import { Button } from 'reactstrap';
interface Props{
    email: string;
    logout() : void;
}

const Logout : React.FC<Props> = (props) =>{
    return(
        <div className="my-2 my-lg-0">
            {props.email} {' '}
            <Button color="link" className="my-2 my-sm-0" onClick={props.logout}>Wyloguj</Button>
        </div>
    )
}

export default Logout;