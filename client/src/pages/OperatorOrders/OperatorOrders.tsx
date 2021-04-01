import {
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../components/Block/Block';
import Loader from '../../components/Loader/Loader';
import { getAllOrders } from '../../service/orders';
import { AppStateType } from '../../store/store';
import InfoModal from './InfoModal/InfoModal';

const OperatorOrders = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state: AppStateType) => state.orderList.orders);
    const isLoading = useSelector(
        (state: AppStateType) => state.orderList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.orderList.error);

    const [orderData, setOrderData] = useState<any>('');

    // Стейт модальных окон
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

    // Закрыть окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
    };

    // Выбрать заказ
    const selectOrderHandler = (order: any) => {
        setOrderData(order);
        console.log(order);

        setIsOpenInfoModal(true);
    };

    useEffect(() => {
        dispatch(getAllOrders());
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
            <Block>
                <CardHeader title="Обработка заказов"></CardHeader>
                <Divider />
                <CardContent>
                    <List>
                        {orders.map((item: any) => {
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

export default OperatorOrders;
