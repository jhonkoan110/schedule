import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import locationTypesReducer from './locationTypes/reducer';
import mastersReducer from './masters/reducer';
import ordersReducer from './orders/reducer';
import rolesReducer from './roles/reducer';
import signupReducer from './signup/reducer';
import specializationsReducer from './specializtions/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
    masterList: mastersReducer,
    usersList: usersReducer,
    auth: authReducer,
    signup: signupReducer,
    orderList: ordersReducer,
    specializationList: specializationsReducer,
    locationTypeList: locationTypesReducer,
    roleList: rolesReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
