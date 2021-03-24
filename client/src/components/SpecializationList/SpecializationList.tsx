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
import {
    createSpecialization,
    getAllSpecializations,
} from '../../service/specializations';
import { AppStateType } from '../../store/store';
import { useStyles } from './entityListStyle';
import Modal from '../Modal/Modal';
import { ISpecialization } from '../../store/specializtions/types';
import InfoModal from './InfoModal/InfoModal';
import Loader from '../Loader/Loader';

const EntityList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const specializations = useSelector(
        (state: AppStateType) => state.specializationList.specializations
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.specializationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.specializationList.error
    );

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [specializationData, setSpecializationData] = useState({
        id: 0,
        name: '',
        icon: '',
    });

    // Загрузить все специализации
    useEffect(() => {
        dispatch(getAllSpecializations());
    }, []);

    // Открыть модальное окно
    const openModalHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setIsOpenModal(true);
    };

    // Закрыть модальное окно
    const closeModalHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setIsOpenModal(false);
    };

    // Обработчик инпутов модального окна
    const modalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpecializationData({
            ...specializationData,
            [e.target.id]: e.target.value,
        });
    };

    // Закрыть модальное окно информации
    const closeInfoModalHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setIsInfoModalOpen(false);
    };

    // Сохранить спец-ю
    const saveSpecializationHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        dispatch(createSpecialization(specializationData));
        setSpecializationData({ id: 0, name: '', icon: '' });
        setIsOpenModal(false);
    };

    // Выбрать спец-ю
    const selectSpecialization = (id: number, name: string, icon: string) => {
        setSpecializationData({ id, name, icon });
        setIsInfoModalOpen(true);
    };

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
                        onClick={openModalHandler}
                        variant="contained"
                        color="primary"
                        className={classes.addButton}
                    >
                        Добавить
                    </Button>
                </ListItem>
                {specializations.map((item: ISpecialization) => {
                    return (
                        <ListItem
                            button
                            key={item.id}
                            onClick={() => {
                                selectSpecialization(
                                    item.id,
                                    item.name,
                                    item.icon
                                );
                            }}
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    );
                })}
            </List>

            {isOpenModal && (
                <Modal
                    header="Добавить специализацию"
                    isOpen={isOpenModal}
                    isEdit={true}
                    closeModal={closeModalHandler}
                    save={saveSpecializationHandler}
                >
                    <TextField
                        id="name"
                        label="Название"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={specializationData.name}
                        onChange={modalChangeHandler}
                    />
                    <TextField
                        id="icon"
                        label="Иконка"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={specializationData.icon}
                        onChange={modalChangeHandler}
                    />
                </Modal>
            )}

            {isInfoModalOpen && (
                <InfoModal
                    header="Информация по специализации"
                    isOpen={isInfoModalOpen}
                    id={specializationData.id}
                    name={specializationData.name}
                    icon={specializationData.icon}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default EntityList;
