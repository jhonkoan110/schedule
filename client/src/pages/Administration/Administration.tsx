import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import useAdministrationStyles from './administrationStyle';

const Administration: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useAdministrationStyles();

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    return (
        <Grid container className={classes.administration}>
            <Grid item xs={1}></Grid>
            <Grid container item spacing={2} className={classes.content} xs={10}>
                Админка
            </Grid>
            <Grid item xs={1}></Grid>

            <Modal isOpen={isOpen} closeModal={closeModalHandler} />
        </Grid>
    );
};

export default Administration;
