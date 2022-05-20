import React, {useState, Fragment} from "react";
import {Navigate, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Helmet } from "react-helmet";

const UserAddAddress = () => {
    const user = useSelector(st => st.users.user);
    const [addressInfo, setAddressInfo] = useState(
            {
                name: "",
                streetone: "",
                streettwo: "",
                state:"",
                postalcode:"",
                phonenumber:"",
                errors:[]
            }
        );

    if(!user){
        return(
            <Navigate to="/login" />
        )
    }

    let data;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddressInfo(i => ({...i, [name]: value}));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
    }

    const addAddressFields = (
        <div>
            <div className="form-group">
                <label>Name</label>
                <input 
                    name="name"
                    className="form-control"
                    value={addressInfo.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Street Address</label>
                <input 
                    name="streetone"
                    className="form-control"
                    value={addressInfo.streetone}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Street Address 2</label>
                <input 
                    name="streettwo"
                    className="form-control"
                    value={addressInfo.streettwo}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>State</label>
                <input 
                    name="state"
                    className="form-control"
                    value={addressInfo.state}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Postal Code</label>
                <input 
                    name="postalcode"
                    className="form-control"
                    value={addressInfo.postalcode}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input 
                    name="phonenumber"
                    className="form-control"
                    value={addressInfo.phonenumber}
                    onChange={handleChange}
                />
            </div>
        </div>
    )

    return(
        <Fragment>
            <Helmet>
                <title>Add Address</title>
            </Helmet>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div className="card">
                        <div className="card-title"><h3>Add Address</h3></div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {addAddressFields}
                                <button className="btn btn-primary mt-2" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
};

export default UserAddAddress;