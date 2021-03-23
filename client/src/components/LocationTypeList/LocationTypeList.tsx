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
    createLocationType,
    getAllLocationTypes,
} from '../../service/locationTypes';
import { ILocationTypes } from '../../store/locationTypes/types';
import { AppStateType } from '../../store/store';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import InfoModal from './InfoModal/InfoModal';
import useStyles from './locationTypeListStyle';

interface LocationTypeListProps {}

const LocationTypeList: React.FC<LocationTypeListProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const locationTypes = useSelector(
        (state: AppStateType) => state.locationTypeList.locationTypes
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.locationTypeList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.locationTypeList.error
    );

    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
    const [locationTypeData, setLocationTypeData] = useState({
        id: 0,
        name: '',
    });

    // Открыть модальное окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(true);
    };

    // Закрыть модальное окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
    };

    // Закрыть модальное окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
    };

    // Обработчик инпута окна добавления
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationTypeData({
            ...locationTypeData,
            name: e.target.value,
        });
    };

    // Загрузить все типы локаций
    useEffect(() => {
        dispatch(getAllLocationTypes());
    }, []);

    // Создать тип локации
    const saveLocationType = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(
            createLocationType({
                id: 0,
                name: locationTypeData.name,
            })
        );
        setLocationTypeData({ id: 0, name: '' });
        setIsOpenAddModal(false);
    };

    // Выбрать тип локации
    const selectLocationType = (id: number, name: string) => {
        setLocationTypeData({ id, name });
        setIsOpenInfoModal(true);
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
                        onClick={openAddModalHandler}
                        variant="contained"
                        color="primary"
                        className={classes.addButton}
                    >
                        Добавить
                    </Button>
                </ListItem>
                {locationTypes.map((item: ILocationTypes) => {
                    return (
                        <ListItem
                            button
                            key={item.id}
                            onClick={() =>
                                selectLocationType(item.id, item.name)
                            }
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    );
                })}
            </List>

            <Modal
                header="Добавить тип локации"
                isOpen={isOpenAddModal}
                isEdit={true}
                closeModal={closeAddModalHandler}
                save={saveLocationType}
            >
                <TextField
                    id="name"
                    label="Название"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={locationTypeData.name}
                    onChange={changeHandler}
                />
            </Modal>

            <InfoModal
                id={locationTypeData.id}
                name={locationTypeData.name}
                header="Информация о типе локации"
                isOpen={isOpenInfoModal}
                closeModal={closeInfoModalHandler}
            />
        </>
    );
};

export default LocationTypeList;
