
import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import { entryListReducer, entryDetailsReducer, entryListMyReducer, entryDeleteReducer, entryCreateReducer, entryUpdateReducer } from './reducers/entryReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const store = configureStore({
    reducer: {
       entryList: entryListReducer,
       entryDetails: entryDetailsReducer,
       entryDelete: entryDeleteReducer,
       entryCreate: entryCreateReducer,
       entryUpdate: entryUpdateReducer,
       entryListMy: entryListMyReducer,
       userLogin: userLoginReducer,
       userRegister: userRegisterReducer,
       userDetails: userDetailsReducer,
       userUpdateProfile: userUpdateProfileReducer,
    },
    preloadedState: {
        userLogin: { userInfo: userInfoFromStorage },
    },
    middleware: [thunk],
})

export default store