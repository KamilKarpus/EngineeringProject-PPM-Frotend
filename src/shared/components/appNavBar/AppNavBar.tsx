import React, { useState } from 'react';
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Strona główna</NavbarBrand>
          <NavbarToggler onClick={toggle} />
        </Navbar>
      </div>
    );
  }

  export default AppNavbar;