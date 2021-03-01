import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { Dispatch, SetStateAction, useState } from 'react';
import BuildIcon from '@material-ui/icons/Build';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListAltIcon from '@material-ui/icons/ListAlt';
import WorkIcon from '@material-ui/icons/Work';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { useDispatch, useSelector } from 'react-redux';
import { getMasterList } from '../../service/masters';
import { getUsers } from '../../service/users';
import { AppStateType } from '../../store/store';

interface AdminListProps {
    setItems: Dispatch<SetStateAction<never[]>>;
    showItems: (getItems: any) => void;
}

const AdminList: React.FC<AdminListProps> = ({ setItems, showItems }) => {
    const dispatch = useDispatch();
    const [entities, setEntities] = useState([]);
    const users = useSelector((state: AppStateType) => state.usersList.users);
    const masters = useSelector((state: AppStateType) => state.masterList.masters);

    const usersClickHandler = async () => {
        await dispatch(getUsers());
        setItems(users);
    };

    const mastersClickHandler = async () => {
        await dispatch(getMasterList());
        setItems(masters);
    };

    return (
        <>
            <List>
                <ListItem button onClick={usersClickHandler}>
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Пользователи" />
                </ListItem>

                <ListItem button onClick={mastersClickHandler}>
                    <ListItemIcon>
                        <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary="Мастера" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Услуги" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Специализации" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Типы локаций" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary="Заказы" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <ScheduleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Расписание" />
                </ListItem>
            </List>
        </>
    );
};

export default AdminList;
