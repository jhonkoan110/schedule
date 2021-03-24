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
import { createOrder, getAllOrders } from '../../../service/orders';
import { AppStateType } from '../../../store/store';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import InfoModal from '../InfoModal/InfoModal';
import useStyles from './orderListStyles';

interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const orders = useSelector((state: AppStateType) => state.orderList.orders);
    const isLoading = useSelector(
        (state: AppStateType) => state.orderList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.orderList.error);

    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

    const [orderData, setOrderData] = useState({
        id: 0,
        master_id: 0,
        user_id: 0,
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        status_color: '',
        commentary: '',
        photo: '',
    });

    // Открыть окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(true);
    };
    // Закрыть окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
    };

    // Обработчик инпутов окна добавления
    const addModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({
            ...orderData,
            [e.target.id]: e.target.value,
        });
    };

    // Добавить заказ
    const createOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(createOrder(orderData));
        setIsOpenAddModal(false);
    };

    // Закрыть окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
    };

    // Выбрать заказ
    const selectOrderHandler = (order: any) => {
        setOrderData(order);
        setIsOpenInfoModal(true);
    };

    // Загрузить все заказы
    useEffect(() => {
        dispatch(getAllOrders());
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
                {orders.map((item: any) => {
                    return (
                        <ListItem
                            button
                            key={item.id}
                            onClick={() => selectOrderHandler(item)}
                        >
                            <ListItemText primary={item.description} />
                        </ListItem>
                    );
                })}
            </List>

            {isOpenAddModal && (
                <Modal
                    header="Добавить заказ"
                    isOpen={isOpenAddModal}
                    isEdit={true}
                    closeModal={closeAddModalHandler}
                    save={createOrderHandler}
                >
                    <TextField
                        id="description"
                        label="Описание"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.description}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="start_date"
                        label="Дата начала"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.start_date}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="end_date"
                        label="Дата окончания"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.end_date}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="status"
                        label="Статус"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.status}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="status_color"
                        label="Цвет статуса"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.status_color}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="commentary"
                        label="Комментарий"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.commentary}
                        onChange={addModalChangeHandler}
                    />
                    <TextField
                        id="photo"
                        label="фото"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.photo}
                        onChange={addModalChangeHandler}
                    />
                </Modal>
            )}

            {isOpenInfoModal && (
                <InfoModal
                    order={orderData}
                    header="Информация о заказе"
                    isOpen={isOpenInfoModal}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default OrderList;
