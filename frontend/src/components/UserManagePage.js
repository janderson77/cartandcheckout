import React, { Fragment, useEffect, useState} from "react";
import {Navigate, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Helmet } from "react-helmet";
import profileBlank from '../static/profileBlank.svg';
import './css/UserManagePage.css'


const UserManagePage = () => {
    let user = useSelector(st => st.users.user);

    if(!user){return(
        <Navigate to={"/login"} />
        )
    };
      

    let addressesList;
    if(user.addresses){
        addressesList = user.addresses.map(e => (
            <div key={e.addressid} className="card address-card col-lg-8">
                <div className="card-body">
                    <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                    <p className="card-text">
                        {e.streetone}<br/>
                        {e.streettwo ? e.streettwo : null} <br/>
                        {e.state}<br/>
                        {e.postalcode}<br/>
                        {e.phonenumber}
                    </p>
                </div>
            </div>
        ));
    }else{
        addressesList = (
            <div>
                <h4>No Addresses</h4>
            </div>
        )
    };

    const AddAddressButton = () => {
        return(
        <NavLink className="btn btn-primary mt-4" to={`/users/${user.userid}/manage/address`}>
                <div>Add Address</div>
        </NavLink>
        )
    };

    let userInfo = () => {
        return(
            <div>
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
            </div>
        )
    }

    const readyView = () => {
        return(
            <Fragment>
                <h1>User Manage Page</h1>
                <h3>{user.username}</h3>
                <div className="container address-container d-flex flex-row">
                    <div className="row profile-area">
                        <h2>Profile stuff</h2>
                        {userInfo()}
                    </div>
                    <div className="row address-area">
                            {addressesList}
                            <AddAddressButton />
                    </div>
                </div>
                
                
            </Fragment>
        )
    };

    

return(
    <Fragment>
        <Helmet><title>Cart and Checkout Demo || {user.username} Manage</title></Helmet>
        {readyView()}
    </Fragment>
    
    
)
};

export default UserManagePage;