import {
    Button,
    Card,
    CardHeader,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../../components/Block/Block';
import Loader from '../../../components/Loader/Loader';
import useStyles from '../../../components/Modal/infoModalStyle';
import { getAllMasters } from '../../../service/masters';
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

    // Включить редактирование
    const editOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsDisabled(false);
    };

    // Включить редактирование
    const saveOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsDisabled(true);
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
    const changeSelectServiceHandler = async (event: any) => {
        if (!event.target.value) {
            setOrderData({
                ...orderData,
                price: 0,
                end_date: '',
            });

            setSelectedService('');
            return;
        }

        // console.log(event.target.value);
        setSelectedService(event.target.value);

        const oneService = services.filter(
            (item: IServiceCatalog) => item.id === event.target.value
        );
        setPrice(oneService[0].price);

        const hoursAndMinutes = oneService[0].duration.split(':');
        const hours = hoursAndMinutes[0];
        const minutes = hoursAndMinutes[1];
        const durationMs = new Date(
            Number(hours) * 3600 * 1000 + Number(minutes) * 60 * 1000
        );

        // console.log('durationMS: ', durationMs.getTime());
        const temp = new Date(orderData.start_date).getTime();

        const end_date = new Date(temp + durationMs.getTime());
        // console.log('start_date: ', orderData.start_date);

        // console.log('end_date: ', end_date);

        // console.log('end_ISO_data: ',new Date(end_date.toISOString().substr(0, 19)));
        // console.log('end_date_format: ', moment(end_date).format('YYYY-MM-DThh:mm:ss'));

        setOrderData({
            ...orderData,
            end_date: moment(end_date).format('YYYY-MM-DDTHH:mm:ss'),
        });
    };

    // Обработка селекта мастера
    const changeSelectMasterHandler = async (event: any) => {
        setSelectedMaster(event.target.value);
    };

    useEffect(() => {
        dispatch(getAllServiceCatalogs());
        dispatch(getAllMasters())
    }, []);

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
                    </form>
                    <form noValidate>
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

                    <TextField
                        id="commentary"
                        label="Комментарий"
                        className={classes.input}
                        required
                        disabled={isDisabled}
                        variant="outlined"
                        value={orderData.commentary}
                        onChange={orderChangeHandler}
                    />
                    <TextField
                        id="location"
                        label="Адрес"
                        className={classes.input}
                        required
                        disabled={isDisabled}
                        variant="outlined"
                        value={orderData.location.name}
                        onChange={orderChangeHandler}
                    />
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id="service_label">
                            Выбрать услугу
                        </InputLabel>
                        <Select
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
                    {masters.length > 0 && (
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="master_label">
                                Подобрать мастера
                            </InputLabel>
                            <Select
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
                                {masters.map((item: any) => {
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
                                onClick={saveOrderHandler}
                            >
                                Сохранить
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            color="secondary"
                            // onClick={openDeleteModalHandler}
                        >
                            Удалить
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default InfoModal;
