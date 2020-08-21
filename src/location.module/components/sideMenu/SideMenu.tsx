import React from 'react';
import { Button } from 'reactstrap';
import { IoMdAddCircle } from 'react-icons/io';
import "./SideMenu.css";
import LocationEditComponent from '../locationEditorComponent/LocationEditComponent';
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
                isOpen === true && <LocationEditComponent closePopup={closePopup} isOpen={isOpen}/>
            }
    <ul>
        <li>
            <Button color="link" onClick={openPopup}> <IoMdAddCircle/> Utwórz nowy krok</Button>
        </li>
    </ul>
  </div>);
}
export default SideMenu;