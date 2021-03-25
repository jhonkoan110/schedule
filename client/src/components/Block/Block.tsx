import { Card, Grid } from '@material-ui/core';
import React from 'react';
import useStyles from './blockStyles';

const Block: React.FC = ({ children }) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid container item xs={8}>
                <Card className={classes.card}>{children}</Card>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
};

export default Block;
