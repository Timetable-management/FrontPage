import React, { useState } from 'react';
import './Menu.scss';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Icons from '../../Iconos/Icons';

const Menu = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='Menu'>
            <Navbar id='myNavBar' color="danger" navbar-dark dark sticky-top >
                <NavbarBrand href="/Home">
                    <img className='logo'
                        src='https://s6.gifyu.com/images/logo-blanco-lapajita.png'
                        alt='logo'
                        width='100px'
                        height='auto' />
                </NavbarBrand>
                <NavbarToggler id='myToggler' onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto super" navbar>
                        <NavItem>
                            <NavLink href="/principalPage">{Icons.Home} Home  </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink >{Icons.Envelope} Mensajes </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink >{Icons.Tasks} Todas mis tareas  </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink >{Icons.UserAlt} Perfil personal  </NavLink>
                        </NavItem>
                        <NavItem id='logout'>
                            <NavLink >{Icons.Users} Mi equipo </NavLink>
                        </NavItem>
                        <NavItem id='logout'>
                            <NavLink >{Icons.ChartBar} Gráficas </NavLink>
                        </NavItem>
                        <NavItem id='logout'>
                            <NavLink href="/">{Icons.SignOutAlt} Salir </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Menu;