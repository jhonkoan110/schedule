import { Card, Grid, Typography } from '@material-ui/core';
import React from 'react';
import useAdministrationStyles from './administrationStyle';
import AdminList from '../../components/AdminList/AdminList';
import EntityList from '../../components/SpecializationList/SpecializationList';
import { Route } from 'react-router';
import LocationTypeList from '../../components/LocationTypeList/LocationTypeList';
import UserList from '../../components/UserList/UserList';
import ServiceCatalogList from '../../components/ServiceCatalog/ServiceCatalogList/ServiceCatalogList';
import OrderList from '../../components/Orders/OrderList/OrderList';
import MasterList from '../../components/Masters/MasterList/MasterList';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../store/store';
import LocationListTreeView from '../../components/Locations/LocationList/LocationListTreeView';

const Administration: React.FC = () => {
    const classes = useAdministrationStyles();
    const authData = useSelector((state: AppStateType) => state.auth.authData);

    if (authData) {
        switch (authData.user.role.name) {
            case 'Администратор': {
                return (
                    <Grid container className={classes.administration}>
                        <Grid item xs={1}></Grid>
                        <Grid container item spacing={2} xs={10}>
                            <Card className={classes.card}>
                                <Grid container item xs={3}>
                                    <AdminList />
                                </Grid>

                                <Grid container item xs={9}>
                                    <Route
                                        exact
                                        path="/administration/specializations"
                                    >
                                        <EntityList />
                                    </Route>
                                    <Route
                                        exact
                                        path="/administration/location_types"
                                    >
                                        <LocationTypeList />
                                    </Route>
                                    <Route exact path="/administration/users">
                                        <UserList />
                                    </Route>
                                    <Route
                                        exact
                                        path="/administration/locations"
                                    >
                                        {/* <LocationList /> */}
                                        <LocationListTreeView />
                                    </Route>
                                    <Route
                                        exact
                                        path="/administration/services"
                                    >
                                        <ServiceCatalogList />
                                    </Route>
                                    <Route exact path="/administration/orders">
                                        <OrderList />
                                    </Route>
                                    <Route exact path="/administration/masters">
                                        <MasterList />
                                    </Route>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                );
            }

            default:
                return (
                    <Grid container className={classes.administration}>
                        <Grid item xs={1}></Grid>
                        <Grid container item spacing={2} xs={10}>
                            <Card className={classes.card}>
                                <Typography variant="h5">
                                    Вы не администратор
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                );
        }
    }

    return (
        <Grid container className={classes.administration}>
            <Grid item xs={1}></Grid>
            <Grid container item spacing={2} xs={10}>
                <Card className={classes.card}>
                    <Typography variant="h5">Вы не авторизованы</Typography>
                </Card>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    );
};

export default Administration;
