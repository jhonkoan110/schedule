import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Login from './pages/Auth/Login/Login';
import Registration from './pages/Auth/Registration/Registration';
import { AppStateType } from './store/store';

const App: React.FC = () => {
    const authData = useSelector((state: AppStateType) => state.auth.authData);

    // если не авторизован, то редирект на страницу login. если авторизован, то на layout

    return (
        <>
            <Header />
            {authData ? (
                <Switch>
                    <Route path="/">
                        <Main />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/registration">
                        <Registration />
                    </Route>
                    <Redirect to="/login" />
                </Switch>
            )}

            {/* <Route  path="/registration">
                    {authData ? <Main /> : <Login />}
                </Route> */}
        </>
    );
};

export default App;
