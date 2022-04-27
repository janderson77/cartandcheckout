import axios from 'axios';
import {LOGIN, LOGOUT, REGISTER} from './types'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

const register = (data) => {
    return async (dispatch) => {
        const res = await axios.post(`${BASE_URL}/users/register`, {
            username: data.username, 
            password: data.password, 
            first_name: data.first_name, 
            last_name: data.last_name, 
            email: data.email
        });
        dispatch(doRegister(res.data))
    };
};

const login = (data) => {
    return async function(dispatch) {
        const res = await axios.post(`${BASE_URL}/users/login`, {email: data.email, password: data.password});
        let user = res.data;
        console.log(res.data)
        dispatch(doLogin(user));
    };
};

const logout = () => {
    return async function(dispatch) {
        dispatch(doLogout());
    };
};

const doRegister = (user) => {
    return {type: REGISTER, payload: user}
};

function doLogin(user) {
    return {type: LOGIN, payload: user};
};

function doLogout() {
    return {type: LOGOUT}
};

export {login, logout, register};