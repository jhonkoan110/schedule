import {
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMasters } from '../../../service/masters';
import { AppStateType } from '../../../store/store';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import InfoModal from '../InfoModal/infoModal';
import useStyles from './masterListStyles';

const MasterList: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const masters = useSelector(
        (state: AppStateType) => state.masterList.masters
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.masterList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.masterList.error);

    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

    const [masterData, setMasterData] = useState({
        id: 0,
        user: 0,
        specialization: 0,
        location: 0,
    });

    // Открыть окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(true);
    };

    // Закрыть окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
    };

    // Закрыть окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
    };

    // Выбрать мастера
    const selectMasterHandler = (master: any) => {
        setMasterData(master);
        setIsOpenInfoModal(true)
    }

    // Загрузить всех мастеров
    useEffect(() => {
        dispatch(getAllMasters());
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
                {masters.map((item: any) => {
                    return (
                        <ListItem
                            button
                            key={item.id}
                            onClick={() => selectMasterHandler(item)}
                        >
                            <ListItemText primary={item.user.login} />
                        </ListItem>
                    );
                })}
            </List>

            {isOpenAddModal && (
                <Modal
                    header="Добавить мастера"
                    isOpen={isOpenAddModal}
                    isEdit={true}
                    closeModal={closeAddModalHandler}
                    save={() => {}}
                >
                    <TextField
                        id="description"
                        label="Описание"
                        className={classes.input}
                        required
                        variant="outlined"
                        // value={orderData.description}
                        // onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="start_date"
                        label="Дата начала"
                        className={classes.input}
                        required
                        variant="outlined"
                        // value={orderData.start_date}
                        // onChange={addModalChangeHandler}
                    />
                </Modal>
            )}

            {isOpenInfoModal && (
                <InfoModal
                    master={masterData}
                    header="Информация о мастере"
                    isOpen={isOpenInfoModal}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default MasterList;
