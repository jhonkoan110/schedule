import { Grid } from '@material-ui/core';
import React from 'react';
import useAdministrationStyles from './administrationStyle';
import AdminList from '../../components/AdminList/AdminList';
import EntityList from '../../components/SpecializationList/SpecializationList';
import { Route } from 'react-router';
import LocationTypeList from '../../components/LocationTypeList/LocationTypeList';
import UserList from '../../components/UserList/UserList';

const Administration: React.FC = () => {
    const classes = useAdministrationStyles();

    return (
        <Grid container className={classes.administration}>
            <Grid item xs={1}></Grid>
            <Grid
                container
                item
                spacing={2}
                className={classes.content}
                xs={10}
            >
                <Grid container item xs={3}>
                    <AdminList />
                </Grid>
                <Grid container item xs={9}>
                    <Route exact path="/administration/specializations">
                        <EntityList />
                    </Route>
                    <Route exact path="/administration/location_types">
                        <LocationTypeList />
                    </Route>
                    <Route exact path="/administration/users">
                        <UserList />
                    </Route>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>

            {/* <Modal isOpen={isOpen} closeModal={closeModalHandler} /> */}
        </Grid>
    );
};

export default Administration;
