import {
    Button,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../store/store';
import Block from '../../components/Block/Block';
import { getOrdersByUserId } from '../../service/myOrders';
import Modal from '../../components/Modal/Modal';
import React, { useState, useEffect } from 'react';
import useStyles from './myOrdersStyles';
import Loader from '../../components/Loader/Loader';
import ImageAdder from '../../components/ImageUploader/ImageUploader';
import { createOrder } from '../../service/orders';
import { StatusColors } from '../../constants/constants';
import InfoModal from './InfoModal/InfoModal';

const MyOrders: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const myOrders = useSelector(
        (state: AppStateType) => state.myOrderList.myOrders
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.myOrderList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.myOrderList.error);
    const authData = useSelector((state: AppStateType) => state.auth.authData);

    // Адрес
    const [address, setAddress] = useState({
        district: '',
        street: '',
        house: '',
    });

    // Стейт заказа
    const [orderData, setOrderData] = useState({
        id: 0,
        master: null,
        user: authData.user.id,
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        status_color: '',
        commentary: '',
        photo: '',
        address: null,
    });

    // Стейт фото пользователя
    const [file, setFile] = useState<any>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

    // Сделать заказ
    const createOrderHandler = (e: any) => {
        console.log('handle uploading-', file);
        console.log(String(imagePreviewUrl));
        const newOrder = {
            ...orderData,
            photo: String(imagePreviewUrl),
            location: address,
            status: 'Обработка заказа диспетчером',
            status_color: StatusColors.ORDER_PROCESSING,
        };
        console.log(newOrder);
        dispatch(createOrder(newOrder));
        dispatch(getOrdersByUserId(authData.user.id));
    };

    // Стейт модальных окон
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

    // Закрыть окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
        dispatch(getOrdersByUserId(authData.user.id));
    };

    // Открыть окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOrderData({
            id: 0,
            master: null,
            user: authData.user.id,
            description: '',
            start_date: '',
            end_date: '',
            status: '',
            status_color: '',
            commentary: '',
            photo: '',
            address: null,
        });
        setIsOpenAddModal(true);
    };
    // Закрыть окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
        dispatch(getOrdersByUserId(authData.user.id));
    };
    // Обработчик инпутов окна добавления
    const addModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({
            ...orderData,
            [e.target.id]: e.target.value,
        });
        console.log(orderData);
    };

    // Выбрать заказ
    const selectOrderHandler = (order: any) => {
        setOrderData(order);
        setIsOpenInfoModal(true);
    };

    // Загрузить заказы по id пользователя
    useEffect(() => {
        dispatch(getOrdersByUserId(authData.user.id));
    }, [authData.user.id, dispatch]);

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
            <Block>
                <CardHeader title="Мои заказы"></CardHeader>
                <Divider />
                <CardContent>
                    <List>
                        <ListItem>
                            <Button
                                onClick={openAddModalHandler}
                                variant="contained"
                                color="primary"
                            >
                                Заказать
                            </Button>
                        </ListItem>
                        {myOrders.map((item: any) => {
                            return (
                                <ListItem
                                    button
                                    key={item.id}
                                    onClick={() => selectOrderHandler(item)}
                                >
                                    <ListItemText primary={item.description} />
                                    <ListItemText
                                        primary={item.status}
                                        style={{ color: item.status_color }}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </CardContent>
                <Divider />
            </Block>

            <Modal
                header="Создание заказа"
                isOpen={isOpenAddModal}
                isEdit={false}
                closeModal={closeAddModalHandler}
                save={createOrderHandler}
            >
                <TextField
                    id="description"
                    label="Описание заказа"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={orderData.description}
                    onChange={addModalChangeHandler}
                />
                <form noValidate>
                    <TextField
                        className={classes.input}
                        variant="outlined"
                        id="start_date"
                        label="Дата начала"
                        type="datetime-local"
                        onChange={addModalChangeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
                <TextField
                    id="address"
                    label="Адрес"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={orderData.address}
                    onChange={addModalChangeHandler}
                />
                <ImageAdder
                    imagePreviewUrl={imagePreviewUrl}
                    setImagePreviewUrl={setImagePreviewUrl}
                    setFile={setFile}
                />
            </Modal>

            {isOpenInfoModal && (
                <InfoModal
                    imageUrl={imagePreviewUrl}
                    order={orderData}
                    header="Информация о заказе"
                    isOpen={isOpenInfoModal}
                    setIsOpen={setIsOpenInfoModal}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default MyOrders;
