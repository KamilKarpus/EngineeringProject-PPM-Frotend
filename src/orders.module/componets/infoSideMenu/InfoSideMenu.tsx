import React from 'react';
import { Button } from 'reactstrap';
import { IoMdAddCircle } from 'react-icons/io';
import EditOrder from '../editOrder/EditOrder';
import './InfoSideMenu.css';
const InfoSideMenu = () =>{
    const [isOpen, setOpen] = React.useState(false);
    const openPopup = () =>{
        setOpen(true);
      } 
      const closePopup = () =>{
          setOpen(false);
      };
    return(
    <div className="container">
          {
                isOpen === true && <EditOrder closePopup={closePopup}/>
            }
    <ul>
        <li>
            <Button color="link" onClick={openPopup}> <IoMdAddCircle/>Dodaj nową paczkę</Button>
        </li>
    </ul>
  </div>);
}
export default InfoSideMenu;