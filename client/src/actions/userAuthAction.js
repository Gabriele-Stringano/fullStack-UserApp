import {LOADING, SET_AUTHENTICATED, GET_USER_DATA} from "./types";
import axios from "axios";

export const setLoading = () => {
    return{
        type:LOADING
    };
};

export const setAuthenticated= (value) =>{
    return{
        type:SET_AUTHENTICATED,
        payload: value
    }
}

export const fetchUserData = (userId) => dispatch => {
    axios.get(`${process.env.REACT_APP_PATH}/api/users/${userId}`)
        .then(response => dispatch({
            type:GET_USER_DATA,
            payload: response.data
        }))
        .catch(err => console.log(err))
}