import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Link,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../../../service/auth';
import { AppStateType } from '../../../store/store';
import useStyles from './style';

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector((state: AppStateType) => state.auth.error);

    const [authData, setAuthData] = useState({
        login: '',
        password: '',
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({
            ...authData,
            [e.target.id]: e.target.value,
        });
    };

    const loginHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(login(authData));
    };

    return (
        <Grid container justify="center">
            <Card className={classes.card}>
                <CardHeader title="Вход" align="center" />
                <CardContent className={classes.cardContent}>
                    <TextField
                        id="login"
                        className={classes.textField}
                        required
                        variant="outlined"
                        label="Введите логин"
                        value={authData.login}
                        onChange={changeHandler}
                        error={error ? true : false}
                        helperText={error ? error : ''}
                    />
                    <TextField
                        id="password"
                        className={classes.textField}
                        required
                        variant="outlined"
                        type="password"
                        label="Введите пароль"
                        value={authData.password}
                        onChange={changeHandler}
                    />
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Typography variant="body2">
                        Нет аккаунта? <NavLink to="/registration">Регистрация</NavLink>
                    </Typography>
                    <Button
                        className={classes.loginButton}
                        variant="contained"
                        onClick={loginHandler}>
                        Войти
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Login;
