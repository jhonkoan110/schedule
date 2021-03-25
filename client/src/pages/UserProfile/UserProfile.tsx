import {
    Card,
    Divider,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Block from '../../components/Block/Block';
import Loader from '../../components/Loader/Loader';
import { AppStateType } from '../../store/store';
import useStyles from './userProfileStyles';

const UserProfile = () => {
    const classes = useStyles();

    const authData = useSelector((state: AppStateType) => state.auth.authData);
    const isLoading = useSelector(
        (state: AppStateType) => state.auth.isLoading
    );
    const error = useSelector((state: AppStateType) => state.auth.error);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Typography variant="h4">{error}</Typography>;
    }

    if (authData) {
        return (
            <>
                <Block>
                        <Typography color="textSecondary" gutterBottom>
                            Ваш логин
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {authData.user.login}
                        </Typography>
                        <Divider />
                        <Typography color="textSecondary" gutterBottom>
                            Имя
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {authData.user.firstname}
                        </Typography>
                        <Divider />
                        <Typography color="textSecondary" gutterBottom>
                            Фамилия
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {authData.user.lastname}
                        </Typography>
                        <Divider />
                        <Typography color="textSecondary" gutterBottom>
                            Отчество
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {authData.user.middlename}
                        </Typography>
                        <Divider />
                        <Typography color="textSecondary" gutterBottom>
                            Роль
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {authData.user.role.name}
                        </Typography>
                        <Divider />
                </Block>
            </>
        );
    }

    return <Typography variant="h4">Войдите под своим логином</Typography>;
};

export default UserProfile;
