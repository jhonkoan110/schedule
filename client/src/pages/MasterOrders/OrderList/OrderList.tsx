import {
    Button,
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
import Block from '../../../components/Block/Block';
import Error from '../../../components/Error/Error';
import Loader from '../../../components/Loader/Loader';
import { getOrdersByMasterId } from '../../../service/orders';
import { AppStateType } from '../../../store/store';
import InfoModal from '../InfoModal/InfoModal';

const OrderList: React.FC = () => {
    const authData = useSelector((state: AppStateType) => state.auth.authData);
    const dispatch = useDispatch();

    const orders = useSelector((state: AppStateType) => state.orderList.orders);
    const isLoading = useSelector(
        (state: AppStateType) => state.orderList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.orderList.error);

    const [orderData, setOrderData] = useState<any>();

    const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

    // Открыть модальное окно информации
    const openInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsInfoModalOpen(true);
    };

    // Закрыть модальное окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsInfoModalOpen(false);
    };

    // Выбрать заказ
    const selectOrderHandler = (order: any) => {
        setOrderData(order);
        setIsInfoModalOpen(true);
    };

    useEffect(() => {
        dispatch(getOrdersByMasterId(authData.master.id));
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <Block>
                <CardHeader title="Мои заказы"></CardHeader>
                <Divider />
                <CardContent>
                    <List>
                        {!orders.length && (
                            <Typography>
                                В данный момент назначенных заказов нет
                            </Typography>
                        )}
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

            {isInfoModalOpen && (
                <InfoModal
                    order={orderData}
                    header={`Информация о заказе №${orderData.id}`}
                    isOpen={isInfoModalOpen}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default OrderList;
