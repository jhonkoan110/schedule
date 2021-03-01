import { Card, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminList from '../../components/AdminList/AdminList';
import ItemList from '../../components/ItemList/ItemList';
import Modal from '../../components/Modal/Modal';
import { getMasterList } from '../../service/masters';
import { AppStateType } from '../../store/store';
import useAdministrationStyles from './administrationStyle';

const Administration: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const classes = useAdministrationStyles();
    const masters = useSelector((state: AppStateType) => state.masterList.masters);
    const [items, setItems] = useState([]);

    const showItemsHandler = () => {
        dispatch(getMasterList());
    };

    const showMastersHandler = () => {
        dispatch(getMasterList());
    };

    const openModalHandler = () => {
        setIsOpen(true);
    };

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    return (
        <Grid container className={classes.administration}>
            <Grid item xs={1}></Grid>
            <Grid container item spacing={2} className={classes.content} xs={10}>
                <Typography variant="h5">Администрирование</Typography>
                <Grid item container spacing={4}>
                    <Grid item xs={4}>
                        <Card>
                            <AdminList showItems={showItemsHandler} setItems={setItems} />
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <ItemList items={items} />
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>

            <Modal isOpen={isOpen} closeModal={closeModalHandler} />
        </Grid>
    );
};

export default Administration;
