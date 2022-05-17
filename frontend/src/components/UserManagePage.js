import React, { Fragment, useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import { Helmet } from "react-helmet";
import profileBlank from '../static/profileBlank.svg';
import {Spinner} from 'reactstrap'
import axios from "axios";


const UserManagePage = () => {
    let user = useSelector(st => st.users.user);
    let [dataReady, setDataReady] = useState(false);
    const baseURL = process.env.baseURL || "http://localhost:3001/"

    let userAddresses;           

    const getAddresses = async (data) => {
        try{
            const res = await axios.get(`${baseURL}users/${data.userid}/addresses`, {params:{
                _token: data._token,
                userid: data.userid
            }})

            // ***************** Time to set this up to use Redux ************
            userAddresses = res.data;
            setDataReady(true)
        }catch(e){
            console.log(e)
        }
        
    };

    useEffect(() => {
            getAddresses(user)
        });

    // user.addresses ? userAddresses = Object.values(user.addresses) : userAddresses = {};

    let addressesList;
    console.log(userAddresses)
    if(userAddresses){
        addressesList = userAddresses.map(e => (
            <div key={e.addressid} className="card">
                <div className="card-body">
                    <h5 className="card-title">Address {e.addressid}</h5>
                    <p className="card-text">
                        {e.streetone}<br/>
                        {e.streettwo ? e.streettwo : null} <br/>
                    </p>
                </div>
            </div>
        ))
    }else{
        addressesList = (
            <div>
                <h4>No Addresses</h4>
            </div>
        )
    }

    const readyView = () => {
        return(
            <Fragment>
                <h1>User Manage Page</h1>
                <h3>{user.username}</h3>
                <div>
                    {addressesList}
                </div>
                
            </Fragment>
        )
    };

    const loadingView = () => {
        return(
            <Fragment>
                <div className="Spinner d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status" />
                </div>   
            </Fragment>
        )
    };

return(
    <Fragment>
        <Helmet><title>Cart and Checkout Demo || {user.username} Manage</title></Helmet>
        {dataReady ? readyView() : loadingView()}
    </Fragment>
    
    
)
};

export default UserManagePage;