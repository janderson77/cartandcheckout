import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, NavItem, NavbarBrand, NavLink} from 'reactstrap'
import {logout} from '../actions/users'

const Navigation = () => {
    const dispatch = useDispatch();
    const user = useSelector((st) => st.users.user)

    const handleLogout = () => {
        try{
            dispatch(logout())
        }catch(e){
            console.log(e)
        }
    }

    const loggedInNav = () => {
        return(
        <Navbar color='dark'>
            <NavbarBrand href="/">C&C</NavbarBrand>
            <NavItem>
                <NavLink href="/" onClick={handleLogout}>Logout</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/cart">Cart</NavLink>
            </NavItem>
        </Navbar>
        )
    };

    const loggedOutNav = () => {
        return(
        <Navbar color='dark'>
            <NavbarBrand href="/">C&C</NavbarBrand>
            <NavItem>
                <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/cart">Cart</NavLink>
            </NavItem>
        </Navbar>
        )
    };

    return(
        <Fragment>
                {user ? loggedInNav() : loggedOutNav()}
        </Fragment>
        
    )
};

export default Navigation;