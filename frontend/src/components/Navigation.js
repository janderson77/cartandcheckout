import React, {Fragment} from 'react';
import {Navbar, NavItem, NavbarBrand, NavLink} from 'reactstrap'

const Navigation = () => {
    return(
        <div>
            <Fragment>
                <Navbar color='dark'>
                    <NavbarBrand href='/'>C&C</NavbarBrand>
                    <NavItem>
                        <NavLink href="/cart">Cart</NavLink>
                    </NavItem>
                </Navbar>
            </Fragment>
        </div>
    )
};

export default Navigation;