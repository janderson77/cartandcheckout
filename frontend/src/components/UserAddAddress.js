import React, { Fragment} from "react";
import {Navigate, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Helmet } from "react-helmet";

const UserAddAddress = () => {
    const user = useSelector(st => st.users.user);

    if(!user){
        return(
            <Navigate to="/login" />
        )
    }
    
    return(
        <Fragment>
            <h1>Add Address</h1>
        </Fragment>
    )
};

export default UserAddAddress;