import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const Loader: React.FC = () => {
    return (
        <>
            <Grid container>
                <CircularProgress style={{ margin: '0 auto' }} />
            </Grid>
        </>
    );
};

export default Loader;
