import React from 'react';
import { Spinner } from 'reactstrap';
import './style.css';
export interface Props {
    message: string;
}
const LoadingSpinner : React.FC<Props> = (props) =>{
    return(
        <div className="spinner">
            <div className="spinner-inner">
                <Spinner color="primary" className="size" />
                <p>{props.message}</p>
            </div>
        </div>
    );
}
export default LoadingSpinner;