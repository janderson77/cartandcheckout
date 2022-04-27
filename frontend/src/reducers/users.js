import {LOGIN, LOGOUT, REGISTER} from '../actions/types';

const INITIAL_STATE = {};

const users = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case REGISTER:
            return{...state, user: {...action.payload}};
        case LOGIN:
            return {...state, 
                user: {...action.payload},
            };
        case LOGOUT:
            return{...INITIAL_STATE};
        default:
            return state;
    }
};

export default users;