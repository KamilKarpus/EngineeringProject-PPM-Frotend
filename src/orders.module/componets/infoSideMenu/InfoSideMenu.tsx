import React from 'react';
import { Button } from 'reactstrap';
import { IoMdAddCircle } from 'react-icons/io';
import './InfoSideMenu.css';
import EditPackage from '../editPackage/EditPackage';
import { useHistory } from 'react-router-dom';
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
                isOpen === true && <EditPackage closePopup={closePopup} isOpen={isOpen}/>
            }
    <ul>
        <li>
            <Button color="link" onClick={openPopup}> <IoMdAddCircle/>Dodaj nową paczkę</Button>
        </li>
    </ul>
  </div>);
}
export default InfoSideMenu;