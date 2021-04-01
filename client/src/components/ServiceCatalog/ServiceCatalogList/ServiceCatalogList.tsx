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
import {
    createServiceCatalog,
    getAllServiceCatalogs,
} from '../../../service/serviceCatalog';
import { getAllSpecializations } from '../../../service/specializations';
import { IServiceCatalog } from '../../../store/serviceCatalog/types';
import { ISpecialization } from '../../../store/specializtions/types';
import { AppStateType } from '../../../store/store';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import InfoModal from '../InfoModal/InfoModal';
import useStyles from './serviceCatalogListStyles';

interface ServiceCatalogListProps {}

const ServiceCatalogList: React.FC<ServiceCatalogListProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isLoading = useSelector(
        (state: AppStateType) => state.serviceCatalogList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.serviceCatalogList.error
    );
    const serviceCatalogs = useSelector(
        (state: AppStateType) => state.serviceCatalogList.serviceCatalog
    );

    const specializations = useSelector(
        (state: AppStateType) => state.specializationList.specializations
    );

    const [
        isSelectSpecializationOpen,
        setIsSelectSpecializationOpen,
    ] = useState(false);
    const [selectedSpecialization, setSelectedSpecialization] = useState<
        string | number
    >('');

    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
    const [
        serviceCatalogData,
        setServiceCatalogData,
    ] = useState<IServiceCatalog>({
        id: 0,
        duration: '',
        name: '',
        price: 0,
        specialization: 0,
    });

    // Открыть окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setServiceCatalogData({
            id: 0,
            duration: '',
            name: '',
            price: 0,
            specialization: 0,
        });
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

    // Обработчик инпутов окна добавления
    const addModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceCatalogData({
            ...serviceCatalogData,
            [e.target.id]: e.target.value,
        });
        console.log(serviceCatalogData);
    };

    // Выбрать услугу
    const selectServiceCatalog = (serviceCatalog: IServiceCatalog) => {
        setServiceCatalogData(serviceCatalog);
        setIsOpenInfoModal(true);
    };

    // Закрыть селект специализации
    const closeSelectSpecializationHandler = () => {
        setIsSelectSpecializationOpen(false);
    };

    // Открыть селект специализации
    const openSelectSpecializationHandler = () => {
        setIsSelectSpecializationOpen(true);
    };

    // Обработка селекта специализации
    const changeSelectSpecializationHandler = (event: any) => {
        setSelectedSpecialization(event.target.value);
    };

    // Создать услугу
    const createServiceCatalogHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const newService = {
            ...serviceCatalogData,
            specialization: +selectedSpecialization,
        };
        dispatch(createServiceCatalog(newService));
        setServiceCatalogData({
            id: 0,
            duration: '',
            name: '',
            price: 0,
            specialization: 0,
        });
    };

    // Загрузить все услуги
    useEffect(() => {
        dispatch(getAllServiceCatalogs());
        dispatch(getAllSpecializations());
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
                {serviceCatalogs.map((item: any) => {
                    return (
                        <ListItem
                            button
                            key={item.id}
                            onClick={() => selectServiceCatalog(item)}
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    );
                })}
            </List>

            {isOpenAddModal && (
                <Modal
                    header="Добавить услугу"
                    isOpen={isOpenAddModal}
                    isEdit={true}
                    closeModal={closeAddModalHandler}
                    save={createServiceCatalogHandler}
                >
                    <TextField
                        id="name"
                        label="Название"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={serviceCatalogData.name}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="price"
                        label="Стоимость"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={serviceCatalogData.price}
                        onChange={addModalChangeHandler}
                    />
                    <form noValidate style={{ width: '100%' }}>
                        <TextField
                            style={{ width: '100%', marginBottom: '1rem' }}
                            id="duration"
                            label="Сколько по времени выполняется услуга"
                            type="time"
                            onChange={addModalChangeHandler}
                            value={serviceCatalogData.duration}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </form>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id="master_label">
                            Выбрать специализацию
                        </InputLabel>
                        <Select
                            style={{ marginBottom: '1rem ' }}
                            labelId="master_label"
                            id="master-open-select"
                            open={isSelectSpecializationOpen}
                            onClose={closeSelectSpecializationHandler}
                            onOpen={openSelectSpecializationHandler}
                            value={selectedSpecialization}
                            onChange={changeSelectSpecializationHandler}
                            defaultValue=""
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {specializations.map((item: ISpecialization) => {
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
                    serviceCatalog={serviceCatalogData}
                    header="Информация об услуге"
                    isOpen={isOpenInfoModal}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default ServiceCatalogList;
