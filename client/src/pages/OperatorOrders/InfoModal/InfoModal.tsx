import {
    Button,
    Card,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Address from '../../../components/Address/Address';
import Block from '../../../components/Block/Block';
import Loader from '../../../components/Loader/Loader';
import DeleteModal from '../../../components/Modal/DeleteModal/DeleteModal';
import useStyles from '../../../components/Modal/infoModalStyle';
import { StatusColors } from '../../../constants/constants';
import { getAllMasters } from '../../../service/masters';
import { updateOrder } from '../../../service/orders';
import { getAllServiceCatalogs } from '../../../service/serviceCatalog';
import { IServiceCatalog } from '../../../store/serviceCatalog/types';
import { AppStateType } from '../../../store/store';

interface InfoModalProps {
    order: any;
    header: string;
    isOpen: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    order,
    header,
    isOpen,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(true);
    const [isSelectServiceOpen, setIsSelectServiceOpen] = useState(false);
    const [isSelectMasterOpen, setIsSelectMasterOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [price, setPrice] = useState<number>(0);

    const services = useSelector(
        (state: AppStateType) => state.serviceCatalogList.serviceCatalog
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.serviceCatalogList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.serviceCatalogList.error
    );

    const masters = useSelector(
        (state: AppStateType) => state.masterList.masters
    );
    const mastersIsLoading = useSelector(
        (state: AppStateType) => state.masterList.isLoading
    );
    const mastersError = useSelector(
        (state: AppStateType) => state.masterList.error
    );

    const [orderData, setOrderData] = useState(order);
    const [selectedService, setSelectedService] = useState<any>('');
    const [selectedMaster, setSelectedMaster] = useState<any>('');
    const [mastersBySpec, setMastersBySpec] = useState<any>([]);
    const [locationID, setLocationID] = useState(0);

    // Включить редактирование
    const editOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsDisabled(false);
    };

    // Обработка инпутов заказа
    const orderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({
            ...orderData,
            [e.target.id]: e.target.value,
        });
    };

    // Закрыть селект родителя
    const closeSelectServiceHandler = () => {
        setIsSelectServiceOpen(false);
    };

    // Открыть селект родителя
    const openSelectServiceHandler = () => {
        setIsSelectServiceOpen(true);
    };
    // Закрыть селект мастера
    const closeSelectMasterHandler = () => {
        setIsSelectMasterOpen(false);
    };

    // Открыть селект мастера
    const openSelectMasterHandler = () => {
        setIsSelectMasterOpen(true);
    };

    // Обработка селекта услуги
    const changeSelectServiceHandler = (event: any) => {
        // Если услуга не выбрана, сбросить поля стоимость и дата окончания
        if (!event.target.value) {
            setOrderData({
                ...orderData,
                price: 0,
                end_date: '',
            });

            setSelectedService('');
            return;
        }

        // Установка выбранной услуги
        setSelectedService(event.target.value);

        // Фильтр услуг по выбранному id
        const oneService = services.filter(
            (item: IServiceCatalog) => item.id === event.target.value
        );
        // Установка стоимости заказа, исходя из стоимости выбранной услуги
        setPrice(oneService[0].price);

        // Получение длительности выполнения услуги в милисекундах
        const hoursAndMinutes = oneService[0].duration.split(':');
        const hours = hoursAndMinutes[0];
        const minutes = hoursAndMinutes[1];
        const durationMs = new Date(
            Number(hours) * 3600 * 1000 + Number(minutes) * 60 * 1000
        );

        // console.log('durationMS: ', durationMs.getTime());
        // Получегие даты начала в милисекундах
        const temp = new Date(orderData.start_date).getTime();

        // Получение даты окончания в мс
        const end_date = new Date(temp + durationMs.getTime());

        // Установка конечной даты в формате, нужном для компонента библиотеки
        setOrderData({
            ...orderData,
            end_date: moment(end_date).format('YYYY-MM-DDTHH:mm:ss'),
            service: event.target.value,
        });

        // Услуги с выбранной специализацией
        const servicesBySpec = services.filter(
            (item: IServiceCatalog) => item.id === event.target.value
        );

        // Установка мастеров в зависимости от локации и специализации услуги
        if (servicesBySpec) {
            setMastersBySpec(
                masters.filter(
                    (master) =>
                        master.specialization.id ===
                            servicesBySpec[0].specialization.id &&
                        master.location.id === locationID
                )
            );
        }
    };

    // Обработка селекта мастера
    const changeSelectMasterHandler = async (event: any) => {
        setSelectedMaster(event.target.value);
        setOrderData({
            ...orderData,
            master: event.target.value,
        });
    };

    // Сохранить изменения заказа
    const saveOrderChangesHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const updatedOrder = {
            ...orderData,
            status: `Назначен мастеру`,
            status_color: StatusColors.ASSIGNED_TO_MASTER,
            address: '',
        };
        setIsDisabled(true);

        // dispatch(updateOrder(updatedOrder));
        console.log('updatedOrder', updatedOrder);
    };

    // Открыть модальное окно "отклонить"
    const openRejectModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsRejectModalOpen(true);
    };

    // Закрыть модальное окно "отклонить"
    const closeRejectModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsRejectModalOpen(false);
    };

    // Отклонить заказ
    const rejectOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const updatedOrder = {
            ...orderData,
            status: 'Отклонено оператором',
            status_color: StatusColors.REJECTED,
        };
        dispatch(updateOrder(updatedOrder));
    };

    useEffect(() => {
        dispatch(getAllServiceCatalogs());
        dispatch(getAllMasters());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Block>
                <Typography variant="h4">{error}</Typography>
            </Block>
        );
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                onClose={closeModal}
                aria-labelledby="simple-dialog-title"
                open={isOpen}
            >
                <DialogTitle id="simple-dialog-title">{header}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="description"
                        label="Описание"
                        className={classes.input}
                        required
                        disabled={isDisabled}
                        variant="outlined"
                        value={orderData.description}
                        onChange={orderChangeHandler}
                    />
                    <form noValidate>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="start_date"
                            label="Дата начала"
                            type="datetime-local"
                            value={orderData.start_date}
                            disabled={isDisabled}
                            onChange={orderChangeHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="end_date"
                            label="Дата окончания"
                            type="datetime-local"
                            value={orderData.end_date}
                            disabled={isDisabled}
                            onChange={orderChangeHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>

                    <Typography>Адрес</Typography>
                    <Typography>{orderData.address}</Typography>

                    <Address transferLocationID={setLocationID} />

                    <FormControl style={{ width: '100%', marginTop: '1rem' }}>
                        <InputLabel id="service_label">
                            Выбрать услугу
                        </InputLabel>
                        <Select
                            disabled={isDisabled}
                            style={{ marginBottom: '1rem ' }}
                            labelId="service_label"
                            id="service-open-select"
                            open={isSelectServiceOpen}
                            onClose={closeSelectServiceHandler}
                            onOpen={openSelectServiceHandler}
                            value={selectedService}
                            onChange={changeSelectServiceHandler}
                            defaultValue=""
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {services.map((item: IServiceCatalog) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {mastersIsLoading && <Loader />}
                    {mastersError && (
                        <Typography variant="h5">{mastersError}</Typography>
                    )}

                    {mastersBySpec.length > 0 && selectedService && (
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="master_label">
                                Подобрать мастера
                            </InputLabel>
                            <Select
                                disabled={isDisabled}
                                style={{ marginBottom: '1rem ' }}
                                labelId="master_label"
                                id="master-open-select"
                                open={isSelectMasterOpen}
                                onClose={closeSelectMasterHandler}
                                onOpen={openSelectMasterHandler}
                                value={selectedMaster}
                                onChange={changeSelectMasterHandler}
                                defaultValue=""
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {mastersBySpec.map((item: any) => {
                                    return (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.user.login}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    )}
                    <Card elevation={0}>
                        <Typography variant="body1">Фото</Typography>
                        <CardMedia
                            image={order.photo}
                            title="фото"
                            className={classes.image}
                        />
                    </Card>
                    {selectedService && (
                        <>
                            <Typography variant="body1">Стоимость: </Typography>
                            <Typography>{price}₽</Typography>
                        </>
                    )}
                    <DialogActions className={classes.actions}>
                        {isDisabled ? (
                            <Button
                                className={classes.buttonMargin}
                                variant="contained"
                                color="primary"
                                onClick={editOrderHandler}
                            >
                                Редактировать
                            </Button>
                        ) : (
                            <Button
                                className={classes.buttonMargin}
                                variant="contained"
                                color="primary"
                                onClick={saveOrderChangesHandler}
                            >
                                Сохранить
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={openRejectModalHandler}
                        >
                            Отклонить
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {isRejectModalOpen && (
                <DeleteModal
                    header="Отклонение заказа"
                    isOpen={isRejectModalOpen}
                    text={orderData.description}
                    closeModal={closeRejectModalHandler}
                    apply={rejectOrderHandler}
                >
                    <TextField
                        id="commentary"
                        label="Комментарий"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.commentary}
                        onChange={orderChangeHandler}
                    />
                </DeleteModal>
            )}
        </>
    );
};

export default InfoModal;
