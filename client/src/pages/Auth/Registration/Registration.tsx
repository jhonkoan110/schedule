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
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signup } from '../../../service/signup';
import useStyles from './style';

const Registration = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        login: '',
        password: '',
        firstname: '',
        lastname: '',
        middlename: '',
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

    const registrationClickHandler = () => {
        dispatch(signup(user));
        setUser({
            login: '',
            password: '',
            firstname: '',
            lastname: '',
            middlename: '',
        });
    };

    return (
        <Grid container justify="center">
            <Card className={classes.card}>
                <CardHeader title="Регистрация" align="center" />
                <CardContent className={classes.cardContent}>
                    <TextField
                        id="login"
                        className={classes.textField}
                        required
                        variant="outlined"
                        label="Придумайте логин"
                        value={user.login}
                        onChange={changeHandler}
                    />
                    <TextField
                        id="password"
                        className={classes.textField}
                        required
                        variant="outlined"
                        label="Придумайте пароль"
                        type="password"
                        value={user.password}
                        onChange={changeHandler}
                    />
                    <TextField
                        id="firstname"
                        className={classes.textField}
                        required
                        variant="outlined"
                        label="Ваше имя"
                        value={user.firstname}
                        onChange={changeHandler}
                    />
                    <TextField
                        id="lastname"
                        className={classes.textField}
                        required
                        variant="outlined"
                        label="Ваща фамилия"
                        value={user.lastname}
                        onChange={changeHandler}
                    />
                    <TextField
                        id="middlename"
                        className={classes.textField}
                        variant="outlined"
                        label="Ваше отчество"
                        value={user.middlename}
                        onChange={changeHandler}
                    />
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Typography variant="body2">
                        Уже есть аккаунт? <NavLink to="/login">Войти</NavLink>
                    </Typography>
                    <Button
                        className={classes.loginButton}
                        variant="contained"
                        onClick={registrationClickHandler}>
                        Зарегистрироваться
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Registration;
