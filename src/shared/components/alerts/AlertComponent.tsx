import React from 'react';
import './AlertComponent.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Button } from 'reactstrap';
export interface Props {
    message: string;
    setAnswer(answer : boolean): void;
    header: string;
    closePopup(): void;
}
const AlertComponent : React.FC<Props> = (props) =>{
    return(
        <div className="popup">
             <div className='popup_inner'>
                <div className="header">
                    {props.header}
                    <a onClick={props.closePopup}> <AiFillCloseCircle className="close_buton" size="35"/> </a>
                </div>
                <div className="content-text">
                    {props.message}
                </div>
                <div className="button-wrapper">
                        <Button color="success" className="button" onClick={()=> { props.setAnswer(true); props.closePopup()}}>Tak</Button>
                        <Button color="danger" className="button" onClick={()=> { props.setAnswer(false); props.closePopup()}}>Nie</Button>
                </div>
            </div>
        </div>
    );
}
export default AlertComponent;