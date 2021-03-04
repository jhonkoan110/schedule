import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Administration from './pages/Administration/Administration';
import Registration from './pages/Auth/Registration/Registration';
import MyOrders from './pages/MyOrders/MyOrders';
import Schedule from './pages/Schedule/Schedule';

const App: React.FC = () => {
    return (
        <>
            <Header />
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
            </Switch>
        </>
    );
};

export default App;
