import {LOADING} from '../actions/types'

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
        default:
            return state
    }
}