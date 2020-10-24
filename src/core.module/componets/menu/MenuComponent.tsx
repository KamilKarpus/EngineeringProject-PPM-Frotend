import React from 'react';
import { Button } from 'reactstrap';
import { IoMdAddCircle } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

const SideMenu = () =>{
    const history = useHistory();
    const moveToPage = () =>{
        history.push('/flowadd');
        
    }
    return (
        <div className="container">
        <ul>
            <li>
                <Button color="link" onClick={()=>moveToPage()}> <IoMdAddCircle/> Utwórz nowy proces</Button>
            </li>
        </ul>
      </div>
    );
}

export default SideMenu;