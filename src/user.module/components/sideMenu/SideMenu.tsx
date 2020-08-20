import React from 'react';
import { Button } from 'reactstrap';
import { IoMdAddCircle } from 'react-icons/io';
import AddUserComponent from '../addUser/AddUserComponent';


const SideMenu = () =>{
    const [isOpen, setOpen] = React.useState<boolean>();
    const openPopup = () =>{
        setOpen(!isOpen);
      } 

      const closePopup = () =>{
          setOpen(!isOpen);
      };
      console.log(isOpen);
    return(
    <div className="container">
          {
                isOpen === true && <AddUserComponent closePopup={closePopup} isOpen={isOpen}/>
            }
    <ul>
        <li>
            <Button color="link" onClick={openPopup}> <IoMdAddCircle/>Utwórz nowego użytkownika</Button>
        </li>
    </ul>
  </div>);
}
export default SideMenu;