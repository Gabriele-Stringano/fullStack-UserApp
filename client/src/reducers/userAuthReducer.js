import {LOADING, SET_AUTHENTICATED} from '../actions/types'

const initialState = {
    isLogged: false,
    loading: false,
}

export default function searchReducer(state = initialState, action){
    switch (action.type){
        case LOADING:
            return{
                ...state,
                loading: true,
        }
        case SET_AUTHENTICATED:
            return{
                ...state,
                isLogged: action.payload
            }
        default:
            return state
    }
}