import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Administration from '../../pages/Administration/Administration';
import Login from '../../pages/Auth/Login/Login';
import Registration from '../../pages/Auth/Registration/Registration';
import MyOrders from '../../pages/MyOrders/MyOrders';
import Schedule from '../../pages/Schedule/Schedule';
import UserProfile from '../../pages/UserProfile/UserProfile';

const Main = () => {
    return (
        <>
            <Switch>
                <Route path="/orders">
                    <MyOrders />
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
                <Redirect to='/profile' />
            </Switch>
        </>
    );
};

export default Main;
