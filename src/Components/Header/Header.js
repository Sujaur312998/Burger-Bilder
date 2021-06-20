import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import Logo from '../../Assets/logo.png';

const Header = () => {
    const state = useSelector(state => state.orderReducer)
    let links = null
    if (state.token === null) {
        links = (
            <Nav className="mr-md-5 " >
                <NavItem>
                    <NavLink to='/login' className="NavLink">Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav className="mr-md-5 " >
                <NavItem>
                    <NavLink exact to='/' className="NavLink">Burger Builer</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/orders' className="NavLink">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/logout' className="NavLink">Logout</NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#D70F64",
                height: "70px",
            }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand ">
                    <img src={Logo} alt="Logo" width="80px" />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}

export default Header;