import {LOGIN, LOGOUT, REGISTER} from '../actions/types';

const INITIAL_STATE = {};

const users = (state = INITIAL_STATE, action) => {
    let user;
    switch(action.type){
        case REGISTER:
            return{...state, user: {...action.payload}};
        case LOGIN:
            return {...state, 
                user: {...action.payload},
                visiting: {}
            };
        case LOGOUT:
            return{...INITIAL_STATE};
        default:
            return state;
    }
};

export default users;