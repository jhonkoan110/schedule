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
import { createLocation, getAllLocations } from '../../../service/locations';
import { ILocation } from '../../../store/locations/types';
import { ILocationTypes } from '../../../store/locationTypes/types';
import { AppStateType } from '../../../store/store';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import InfoModal from '../InfoModal/InfoModal';
import useStyles from './locationListStyles';

interface LocationListProps {}

const LocationList: React.FC<LocationListProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(
        (state: AppStateType) => state.locationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.locationList.error
    );
    const locations = useSelector(
        (state: AppStateType) => state.locationList.locations
    );
    const locatioTypes = useSelector(
        (state: AppStateType) => state.locationTypeList.locationTypes
    );

    const [locationData, setLocationData] = useState({
        id: 0,
        coordinates: '',
        name: '',
    });
    const [location_type, setLocation_type] = useState<string | number>(0);
    const [selectedParent, setSelectedParent] = useState<any>(0);
    const [parents, setParents] = useState(locatioTypes);

    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
    const [isSelectParentOpen, setIsSelectParentOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<ILocation>({
        id: 0,
        coordinates: '',
        name: '',
        parent: 0,
        location_type_id: 0,
    });

    // Отркыть окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(true);
    };

    // Отркыть окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
    };

    // Обработчик инуптов окна добавления
    const addModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationData({
            ...locationData,
            [e.target.id]: e.target.value,
        });
    };

    // Закрыть селект типа
    const closeSelectTypeHandler = () => {
        setIsSelectTypeOpen(false);
    };

    // Открыть селект типа
    const openSelectTypeHandler = () => {
        setIsSelectTypeOpen(true);
    };
    // Закрыть селект родителя
    const closeSelectParentHandler = () => {
        setIsSelectParentOpen(false);
    };

    // Открыть селект родителя
    const openSelectParentHandler = () => {
        setIsSelectParentOpen(true);
    };

    // Обработка селекта типа
    const changeSelectTypeHandler = async (event: any) => {
        console.log(event.target.value);
        setLocation_type(event.target.value);
    };

    // Обработка нажатия на элемент списка locationTypes
    const clickLocationTypeHandler = (id: string | number) => {
        switch (id) {
            // Если тип локации выбран "дом"
            case 7: {
                const streets = locations.filter(
                    (item: ILocation) => item.location_type_id === 3
                );
                setParents(streets);
                break;
            }

            // Если выбран тип локации "Улица"
            case 3: {
                const districts = locations.filter(
                    (item: ILocation) => item.location_type_id === 5
                );
                setParents(districts);
                break;
            }
            default:
                setParents([]);
        }
    };

    // Обработка селекта родителя
    const changeSelectParentHandler = (event: any) => {
        setSelectedParent(event.target.value);
    };

    // Создать локацию
    const saveLocationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newLocation: ILocation = {
            id: locationData.id,
            name: locationData.name,
            coordinates: locationData.coordinates,
            location_type_id: +location_type,
            parent: selectedParent || null,
        };
        console.log(newLocation);

        dispatch(createLocation(newLocation));
    };

    // Закрыть окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
    };

    // Выбрать локацию
    const selectLocationHandler = (location: ILocation) => {
        setSelectedLocation(location);
        setIsOpenInfoModal(true);
    };

    // Загрузить все локации
    useEffect(() => {
        dispatch(getAllLocations());
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
                {locations.map((item: any) => {
                    return (
                        <ListItem
                            button
                            key={item.id}
                            onClick={() => selectLocationHandler(item)}
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    );
                })}
            </List>

            {isOpenAddModal && (
                <Modal
                    header="Добавить локацию"
                    isOpen={isOpenAddModal}
                    isEdit={true}
                    closeModal={closeAddModalHandler}
                    save={saveLocationHandler}
                >
                    <TextField
                        id="name"
                        label="Название"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={locationData.name}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="coordinates"
                        label="Координаты"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={locationData.coordinates}
                        onChange={addModalChangeHandler}
                    />
                    <FormControl>
                        <InputLabel id="location_type_id_label">
                            Тип локации
                        </InputLabel>
                        <Select
                            labelId="location_type_id_label"
                            id="location_type-open-select"
                            open={isSelectTypeOpen}
                            onClose={closeSelectTypeHandler}
                            onOpen={openSelectTypeHandler}
                            value={location_type}
                            onChange={changeSelectTypeHandler}
                            defaultValue=""
                        >
                            {!locatioTypes.length ? (
                                <MenuItem value={0}>
                                    <em>Нет доступных типов локаций</em>
                                </MenuItem>
                            ) : (
                                <MenuItem value={0}>
                                    <em>Выбрать тип локации</em>
                                </MenuItem>
                            )}

                            {locatioTypes.map((item: ILocationTypes) => {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}
                                        onClick={() =>
                                            clickLocationTypeHandler(item.id)
                                        }
                                    >
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="parent_id_label">
                            Родитель локации
                        </InputLabel>
                        <Select
                            labelId="parent_id_label"
                            id="parent-open-select"
                            open={isSelectParentOpen}
                            onClose={closeSelectParentHandler}
                            onOpen={openSelectParentHandler}
                            value={selectedParent}
                            onChange={changeSelectParentHandler}
                            defaultValue=""
                        >
                            {!parents.length ? (
                                <MenuItem value={0}>
                                    <em>Нет доступных родителей</em>
                                </MenuItem>
                            ) : (
                                <MenuItem value={0}>
                                    <em>Выбрать родителя</em>
                                </MenuItem>
                            )}
                            {parents.map((item: ILocationTypes) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Modal>
            )}

            {isOpenInfoModal && (
                <InfoModal
                    location={selectedLocation}
                    header="Информация о локации"
                    isOpen={isOpenInfoModal}
                    location_types={locatioTypes}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default LocationList;
