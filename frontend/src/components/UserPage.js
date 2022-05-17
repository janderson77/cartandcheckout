import React, { Fragment } from "react";
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { Helmet } from "react-helmet";
import ProfileProduct from "../containers/ProfileProcuct";
import './css/UserPage.css';
import profileBlank from '../static/profileBlank.svg';

const UserPage = () => {
    const user = useSelector(st => st.users.user);
    // const dispatch = useDispatch();

    // let userProducts;

    if(!user){
        return(
            <div>
                <h2>You are not logged in!</h2>
            </div>
        );
    }

    return(
        <Fragment>
            <Helmet><title>Cart and Checkout Demo || UserPage</title></Helmet>

            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={profileBlank} alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        <h4>{user.username}</h4>
                                        <p className="text-secondary mb-1">{user.first_name} {user.last_name}</p>
                                        <p className="text-muted font-size-sm">{user.email}</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <hr />

                            <div>
                                <div className="card">
                                    <div className="card-body manage-profile-cardbody">
                                        <NavLink to={`/users/${user.userid}/manage`} className="btn btn-primary manageprofile-btn d-flex flex-column align-items-center text-center">
                                                <div className="manageprofile-btn col-lg-12">
                                                    <h4>Manage My Profile</h4>
                                                </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                    <h3>My Products</h3>
                                    <hr />
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="row gutters-sm">
                                <ProfileProduct />
                                <ProfileProduct />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default UserPage;