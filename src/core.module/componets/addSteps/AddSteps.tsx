import React from 'react';
import StepFormPopup from '../stepFormPopup/StepFormPopup';
import { Button } from 'reactstrap';

const AddSteps = () => {
  const [isOpen, setOpen] = React.useState(false);
  const openPopup = () =>{
    setOpen(true);
  } 
  const closePopup = () =>{
    setOpen(false);
  }
  return (
    <div>
      <Button onClick={openPopup}>Utwórz nowy krok</Button>
      <div>
        {
          isOpen ? <StepFormPopup closePopup={closePopup} /> : null
        }
      </div>
    </div>
  )
};

export default AddSteps;
