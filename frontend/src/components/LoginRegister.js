import React, {useState, Fragment} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login, register} from '../actions/users';
import Alert from './Alert'
import {Helmet} from 'react-helmet';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState("login");
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name:"",
        email: "",
        errors: []
    });

    let data;

    const handleLogin = () => {
        dispatch(login(data))
    };

    const handleRegister = () => {
        dispatch(register(data))
    };

    const setLoginView = () => {
        setActiveView("login")
    };

    const setSignupView = () => {
        setActiveView("signup")
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        let endpoint;

        if (activeView === "signup"){
            data = {
                username: loginInfo.username,
                password: loginInfo.password,
                first_name: loginInfo.first_name || undefined,
                last_name: loginInfo.last_name || undefined,
                email: loginInfo.email || undefined
            };
            endpoint = "register"
        }else{
            data = {
                email: loginInfo.email,
                password: loginInfo.password
            }
            endpoint = "login"
        };

        if(endpoint === "login"){
            try {
                handleLogin();
            } catch (errors){
                return setLoginInfo(l => ({ ...l, errors }));
            }
            navigate('/profile')
        }else if(endpoint === 'register'){
            try{
                handleRegister();
            }catch (errors) {
                return setLoginInfo(l => ({ ...l, errors }))
            }
            navigate('/profile')
        };
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginInfo(l => ({ ...l, [name]: value}));
    }

    let loginActive = activeView === "login";

    const signupFields = (
        <div>
            <div className="form-group">
                <label>First name</label>
                <input
                name="first_name"
                className="form-control"
                value={loginInfo.first_name}
                onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input
                name="last_name"
                className="form-control"
                value={loginInfo.last_name}
                onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input
                name="username"
                className="form-control"
                value={loginInfo.username}
                onChange={handleChange}
                />
            </div>
        </div>
    );

    return(
        <Fragment>
            <Helmet><title>Login/SignUp</title></Helmet>
            <div className="Login d-flex justify-content-center align-items-center">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div className="d-flex justify-content-end">
                    <div className="btn-group">
                        <button
                        className={`btn btn-primary ${loginActive ? "active" : ""} `}
                        onClick={setLoginView}
                        >
                        Login
                        </button>
                        <button
                        className={`btn btn-primary ${loginActive ? "" : "active"} `}
                        onClick={setSignupView}
                        >
                        Sign up
                        </button>
                    </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <label>Email</label>
                            <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={loginInfo.email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={loginInfo.password}
                            onChange={handleChange}
                            />
                        </div>
                        {loginActive ? "" : signupFields}
                        {loginInfo.errors.length ? (
                            <Alert type="danger" messages={loginInfo.errors} />
                        ) : null}

                        <button
                            type="submit"
                            className="btn btn-primary float-right"
                            onSubmit={handleSubmit}
                        >
                            Submit
                        </button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
        </Fragment>
        
    )
};

export default Login;