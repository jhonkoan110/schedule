import {
    AppBar,
    Breadcrumbs,
    Button,
    ButtonGroup,
    Toolbar,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import React, { useEffect } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { NavLink } from 'react-router-dom';
import useStyles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../store/store';
import { authDataFetched } from '../../store/auth/actionCreators';
import { checkAuth } from '../../service/auth';
import { ADMIN, OPERATOR } from '../../constants/constants';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authData = useSelector((state: AppStateType) => state.auth.authData);

    const logoutHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        localStorage.clear();
        dispatch(authDataFetched(null));
    };

    if (!authData) {
        return (
            <AppBar className={classes.appBar} position="static">
                <Toolbar
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                    <ButtonGroup>
                        <NavLink className={classes.loginButton} to="login">
                            <Button variant="contained">Войти</Button>
                        </NavLink>
                        <NavLink to="registration">
                            <Button variant="contained">
                                Зарегистрироваться
                            </Button>
                        </NavLink>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>
                <Breadcrumbs className={classes.link} aria-label="breadcrumb">
                    <NavLink
                        to="/orders"
                        className={classes.link}
                        activeClassName="active"
                    >
                        <HomeIcon className={classes.icon} />
                        {authData.user.role.name === OPERATOR
                            ? 'Обработка заказов'
                            : 'Мои заказы'}
                    </NavLink>
                    <NavLink
                        to="/schedule"
                        className={classes.link}
                        color="inherit"
                    >
                        <DateRangeIcon className={classes.icon} />
                        Расписание
                    </NavLink>

                    {authData.user.role.name === ADMIN ? (
                        <NavLink
                            to="/administration"
                            className={classes.link}
                            color="inherit"
                        >
                            <SupervisorAccountIcon className={classes.icon} />
                            Администрирование
                        </NavLink>
                    ) : null}
                </Breadcrumbs>

                <ButtonGroup>
                    <NavLink className={classes.loginButton} to="profile">
                        <Button variant="contained">
                            {authData.user.login}
                        </Button>
                    </NavLink>
                    <NavLink to="login">
                        <Button variant="contained" onClick={logoutHandler}>
                            Выйти
                        </Button>
                    </NavLink>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
