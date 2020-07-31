import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import LocationEditComponent from '../components/locationEditorComponent/LocationEditComponent';
import { close } from 'inspector';

const AddLocationPage = () =>{
    const [isOpen, setOpen] = React.useState(false);
    const history = useHistory();
    const openPopup = () =>{
      setOpen(true);
    } 
    const closePopup = () =>{
        setOpen(false);
    };
    return (
        <div>
            {
                isOpen === true && <LocationEditComponent closePopup={closePopup}/>
            }
            <Button onClick={openPopup}>Dodaj nową lokalizacje</Button>
        </div>
    );
}

export default AddLocationPage;