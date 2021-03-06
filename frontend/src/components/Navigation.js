import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavLink} from 'reactstrap'
import {logout} from '../actions/users'

const Navigation = () => {
    const dispatch = useDispatch();
    const user = useSelector(st => st.users.user)
    const navigate = useNavigate();

    const handleLogout = () => {
        try{
            dispatch(logout())
            navigate('/login')
        }catch(e){
            console.log(e)
        }
    }

    const loggedInNav = () => {
        return(
        <Navbar color='dark'>
                <NavbarBrand href="/">C&C</NavbarBrand>
                <div className='d-flex'>
                <Nav className="me-auto">
                        <NavLink href="" onClick={handleLogout}>Logout</NavLink>
                        <NavLink href="/cart">Cart</NavLink>
                        <NavLink href={"/users/"+user.userid}>Profile</NavLink>
                </Nav>
                </div>
        </Navbar>
        )
    };

    const loggedOutNav = () => {
        return(
        <Navbar color='dark'>
                <NavbarBrand href="/">C&C</NavbarBrand>
                <div className='d-flex'>
                    <Nav className='me-auto'>
                    
                        <NavLink href="/login">Login</NavLink>
                        <NavLink href="/cart">Cart</NavLink>
                    </Nav>
                </div>
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