import { configureStore } from '@reduxjs/toolkit';

//rootReducer contains all reducers, reducers return the next state tree


import rootReducer from './reducers';

//createStore creates a Redux store that holds the complete state tree of the app
const store = configureStore({
    reducer:rootReducer,
})

export default store;