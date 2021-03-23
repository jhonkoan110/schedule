import { Card, Grid, List, ListItem, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import useAdministrationStyles from './administrationStyle';
import AdminList from '../../components/AdminList/AdminList';

const Administration: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useAdministrationStyles();

    const closeModalHandler = () => {
        setIsOpen(false);
    };

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
                    Сушность
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>

            <Modal isOpen={isOpen} closeModal={closeModalHandler} />
        </Grid>
    );
};

export default Administration;
