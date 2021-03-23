import React from 'react';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BuildIcon from '@material-ui/icons/Build';
import CallIcon from '@material-ui/icons/Call';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './adminListStyle';
import { NavLink } from 'react-router-dom';

const AdminList: React.FC = () => {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            <NavLink to="/administration/specializations">
                <ListItem button>
                    <ListItemIcon>
                        <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary="Специализации" />
                </ListItem>
            </NavLink>

            <NavLink to="/administration/users">
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Пользователи" />
                </ListItem>
            </NavLink>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Мастера" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <RoomServiceIcon />
                </ListItemIcon>
                <ListItemText primary="Услуги" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <CallIcon />
                </ListItemIcon>
                <ListItemText primary="Заказы" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Локации" />
            </ListItem>
            <NavLink to="/administration/location_types">
                <ListItem button>
                    <ListItemIcon>
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Типы локаций" />
                </ListItem>
            </NavLink>
        </List>
    );
};

export default AdminList;
