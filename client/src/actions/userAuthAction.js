import {LOADING, SET_AUTHENTICATED} from "./types";
//import axios from "axios";

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