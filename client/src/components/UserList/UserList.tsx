import {
    Button,
    FormControl,
    InputLabel,
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
import { createUser, getAllUsers } from '../../service/users';
import { AppStateType } from '../../store/store';
import { IUser } from '../../store/users/types';
import { IRole } from '../../store/roles/types';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import useStyles from './userListStyle';
import InfoModal from './InfoModal/InfoModal';

interface UserListProps {}

const UserList: React.FC<UserListProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const users: IUser[] = useSelector(
        (state: AppStateType) => state.usersList.users
    );
    const roles: IRole[] = useSelector(
        (state: AppStateType) => state.roleList.roles
    );
    const [roleId, setRoleId] = useState<string | number>('');
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
    });

    const [selectedUser, setSelectedUser] = useState(users[0]);

    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

    // Открыть модальное окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(true);
    };

    // Закрыть модальное окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
    };

    // Обработчик инпутов модального окна добавления
    const changeAddModalHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };
    // // Обработчик селекта окна добавления
    // const changeSelectAddModalHandler = (event: any) => {
    //     console.log(roles);

    //     setRoleId(event.target.value);
    // };
    const changeSelectHandler = (event: any) => {
        // setRole(event.target.value as number);
        console.log(event.target.value);
        console.log('roles', roles);
        setRoleId(event.target.value);
    };

    // Закрыть селект
    const closeSelectHandler = () => {
        setIsSelectOpen(false);
    };

    // Открыть селект
    const openSelectHandler = () => {
        setIsSelectOpen(true);
    };

    // Создать пользователя
    const createUserHandler = () => {
        const newUser: IUser = {
            id: 0,
            login: user.login,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            role: {
                id: +roleId,
                name: '',
            },
        };
        dispatch(createUser(newUser));
    };

    // Закрыть окно информации
    const closeInfoModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
    };

    // Выбрать пользователя
    const selectUserHandler = (user: IUser) => {
        setSelectedUser(user);
        setIsOpenInfoModal(true);
    };

    // Загрузить всех пользователей
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

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
                        <ListItem
                            button
                            key={user.id}
                            onClick={() => selectUserHandler(user)}
                        >
                            <ListItemText primary={user.login} />
                        </ListItem>
                    );
                })}
            </List>

            {isOpenAddModal && (
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
                    <FormControl>
                        <InputLabel id="demo-controlled-open-select-label">
                            Роль
                        </InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={isSelectOpen}
                            onClose={closeSelectHandler}
                            onOpen={openSelectHandler}
                            value={roleId}
                            onChange={changeSelectHandler}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {roles.map((role) => {
                                return (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Modal>
            )}

            {isOpenInfoModal && (
                <InfoModal
                    user={selectedUser}
                    header="Информация о пользователе"
                    isOpen={isOpenInfoModal}
                    closeModal={closeInfoModal}
                />
            )}
        </>
    );
};

export default UserList;
