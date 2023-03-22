import {combineReducers} from "redux";

//import Reducer
import userAuthReducer from './userAuthReducer';

export default combineReducers({
    //used in the mapStateToProps
    userAuth: userAuthReducer
});