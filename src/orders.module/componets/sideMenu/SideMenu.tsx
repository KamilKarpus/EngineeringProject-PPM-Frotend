import React from 'react';
import { Button } from 'reactstrap';
import { IoMdAddCircle } from 'react-icons/io';
import "./OrdersMenu.css";import EditOrder from '../editOrder/EditOrder';


;
const SideMenu = () =>{
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
                isOpen === true && <EditOrder closePopup={closePopup} isOpen={isOpen}/>
            }
    <ul>
        <li>
            <Button color="link" onClick={openPopup}> <IoMdAddCircle/> Utwórz nowe zamówienie</Button>
        </li>
    </ul>
  </div>);
}
export default SideMenu;