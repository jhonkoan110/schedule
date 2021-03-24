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
    createServiceCatalog,
    getAllServiceCatalogs,
} from '../../../service/serviceCatalog';
import { IServiceCatalog } from '../../../store/serviceCatalog/types';
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
        specialization: '',
    });

    // Открыть окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setServiceCatalogData({
            id: 0,
            duration: '',
            name: '',
            price: 0,
            specialization: '',
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
    };

    // Выбрать услугу
    const selectServiceCatalog = (serviceCatalog: IServiceCatalog) => {
        setServiceCatalogData(serviceCatalog);
        setIsOpenInfoModal(true);
    };

    // Создать услугу
    const createServiceCatalogHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        dispatch(createServiceCatalog(serviceCatalogData));
        setServiceCatalogData({
            id: 0,
            duration: '',
            name: '',
            price: 0,
            specialization: '',
        });
    };

    // Загрузить все услуги
    useEffect(() => {
        dispatch(getAllServiceCatalogs());
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
                    <TextField
                        id="duration"
                        label="Длительность"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={serviceCatalogData.duration}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="specialization"
                        label="Специализация"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={serviceCatalogData.specialization}
                        onChange={addModalChangeHandler}
                    />
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
