import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { OPERATOR } from '../../constants/constants';
import Administration from '../../pages/Administration/Administration';
import Login from '../../pages/Auth/Login/Login';
import Registration from '../../pages/Auth/Registration/Registration';
import MyOrders from '../../pages/MyOrders/MyOrders';
import OperatorOrders from '../../pages/OperatorOrders/OperatorOrders';
import Schedule from '../../pages/Schedule/Schedule';
import UserProfile from '../../pages/UserProfile/UserProfile';
import { AppStateType } from '../../store/store';

const Main = () => {
    const authData = useSelector((state: AppStateType) => state.auth.authData);

    return (
        <>
            <Switch>
                <Route path="/orders">
                    {authData.user.role.name === OPERATOR ? (
                        <OperatorOrders />
                    ) : (
                        <MyOrders />
                    )}
                </Route>
                <Route path="/schedule">
                    <Schedule />
                </Route>
                <Route path="/administration">
                    <Administration />
                </Route>
                <Route path="/registration">
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/profile">
                    <UserProfile />
                </Route>
                <Redirect to="/profile" />
            </Switch>
        </>
    );
};

export default Main;
