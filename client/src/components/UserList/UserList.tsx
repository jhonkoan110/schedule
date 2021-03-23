import {
    Button,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../service/users';
import { AppStateType } from '../../store/store';
import { IUser } from '../../store/users/types';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import useStyles from './userListStyle';

interface UserListProps {}

const UserList: React.FC<UserListProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const users: IUser[] = useSelector(
        (state: AppStateType) => state.usersList.users
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.usersList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.usersList.error);

    const [user, setUser] = useState({
        id: 0,
        login: '',
        password: '',
        firstname: '',
        lastname: '',
        middlename: '',
        role: {
            id: 0,
            name: '',
        },
    });

    const [isOpenAddModal, setIsOpenAddModal] = useState(false);

    // Открыть модальное окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(true);
    };

    // Закрыть модальное окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
    };

    // Создать пользователя
    const createUserHandler = (e: React.MouseEvent<HTMLButtonElement>) => {};

    // Обработчик инпутов модального окна добавления
    const changeAddModalHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    // Загрузить всех пользователей
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Typography variant="body1">{error}</Typography>;
    }

    return (
        <>
            <List className={classes.list}>
                <ListItem>
                    <Button
                        onClick={openAddModalHandler}
                        variant="contained"
                        color="primary"
                        className={classes.addButton}
                    >
                        Добавить
                    </Button>
                </ListItem>
                {users.map((user: IUser) => {
                    return (
                        <ListItem button key={user.id} onClick={() => {}}>
                            <ListItemText primary={user.login} />
                        </ListItem>
                    );
                })}
            </List>

            <Modal
                header="Добавить пользователя"
                isOpen={isOpenAddModal}
                isEdit={true}
                closeModal={closeAddModalHandler}
                save={createUserHandler}
            >
                <TextField
                    id="login"
                    label="Логин"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={user.login}
                    onChange={changeAddModalHandler}
                />
                <TextField
                    id="password"
                    label="пароль"
                    type="password"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={user.password}
                    onChange={changeAddModalHandler}
                />
                <TextField
                    id="firstname"
                    label="Имя"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={user.firstname}
                    onChange={changeAddModalHandler}
                />
                <TextField
                    id="lastname"
                    label="Фамилия"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={user.lastname}
                    onChange={changeAddModalHandler}
                />
                <TextField
                    id="middlename"
                    label="Отчество"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={user.middlename}
                    onChange={changeAddModalHandler}
                />
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={1}
                    // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </Modal>
        </>
    );
};

export default UserList;
