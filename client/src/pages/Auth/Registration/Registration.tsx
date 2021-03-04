import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import useStyles from './style';

const Registration = () => {
    const classes = useStyles();

    return (
        <Grid container justify="flex-end" alignItems="center">
            <Paper>Регистрация</Paper>
        </Grid>
    );
};

export default Registration;
