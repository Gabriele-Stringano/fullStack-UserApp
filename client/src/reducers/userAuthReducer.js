import { LOADING, SET_AUTHENTICATED, GET_USER_DATA } from '../actions/types'

const initialState = {
    isLogged: false,
    loading: false,
    userData: {},
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case SET_AUTHENTICATED:
            return {
                ...state,
                isLogged: action.payload
            }
        case GET_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state
    }
}