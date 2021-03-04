import { AppBar, Breadcrumbs, Button, makeStyles, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
    console.log(theme);

    return {
        appBar: {
            marginBottom: '0.5rem',
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        link: {
            display: 'flex',
            color: '#fff',
            '&.active': {
                color: '#f3a5d7',
            },
        },
        activeLink: {
            color: 'secondary',
        },
        icon: {
            marginRight: theme.spacing(0.5),
        },
    };
});

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>
                <Breadcrumbs className={classes.link} aria-label="breadcrumb">
                    <NavLink to="/orders" className={classes.link} activeClassName="active">
                        <HomeIcon className={classes.icon} />
                        Мои заказы
                    </NavLink>
                    <NavLink to="/schedule" className={classes.link} color="inherit">
                        <DateRangeIcon className={classes.icon} />
                        Расписание
                    </NavLink>
                    <NavLink to="/administration" className={classes.link} color="inherit">
                        <SupervisorAccountIcon className={classes.icon} />
                        Администрирование
                    </NavLink>
                </Breadcrumbs>
                <NavLink to="registration">
                    <Button variant="contained">Войти</Button>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
