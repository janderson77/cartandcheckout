import React, { Fragment } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { Helmet } from "react-helmet";

const UserPage = () => {
    const user = useSelector(st => st.users.user);
    const dispatch = useDispatch();

    let userProducts;

    if(!user){

    }
    return(
        <Fragment>
            <Helmet><title>Cart and Checkout Demo | UserPage</title></Helmet>

        </Fragment>
    )
};

export default UserPage;