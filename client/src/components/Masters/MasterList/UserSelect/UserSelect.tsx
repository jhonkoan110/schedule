import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../service/users';
import { AppStateType } from '../../../../store/store';
import Error from '../../../Error/Error';
import Loader from '../../../Loader/Loader';

interface UserSelectProps {
    transferSelectedUser: Dispatch<any>;
}

const UserSelect: React.FC<UserSelectProps> = ({ transferSelectedUser }) => {
    const dispatch = useDispatch();
    const users = useSelector((state: AppStateType) => state.usersList.users);
    const isLoading = useSelector(
        (state: AppStateType) => state.usersList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.usersList.error);

    const [isSelectUserOpen, setIsSelectUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<number>(0);

    // Закрыть селект пользователя
    const closeSelectUserHandler = (e: any) => {
        setIsSelectUserOpen(false);
    };
    // Закрыть селект пользователя
    const openSelectUserHandler = (e: any) => {
        setIsSelectUserOpen(true);
    };

    // Обработка селекта пользователя
    const changeSelectUserHandler = (e: any) => {
        // if (!e.target.value) {

        // }
        setSelectedUser(e.target.value);
        transferSelectedUser(e.target.value);
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id="user_label">Выбрать пользователя</InputLabel>
            <Select
                style={{ marginBottom: '1rem ' }}
                labelId="user_label"
                id="user-open-select"
                open={isSelectUserOpen}
                onClose={closeSelectUserHandler}
                onOpen={openSelectUserHandler}
                value={selectedUser}
                onChange={changeSelectUserHandler}
                defaultValue=""
            >
                {!users.length ? (
                    <MenuItem value={0}>
                        <em>Нет доступных юзеров</em>
                    </MenuItem>
                ) : (
                    <MenuItem value={0}>
                        <em>Выбрать юзера</em>
                    </MenuItem>
                )}
                {users.map((user: any) => {
                    return (
                        <MenuItem key={user.id} value={user.id}>
                            {user.login}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default UserSelect;
