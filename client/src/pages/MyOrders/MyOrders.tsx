import { Card, CardContent, CardHeader, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
} from '@syncfusion/ej2-react-schedule';
import { useDispatch, useSelector } from 'react-redux';
import TableScheduleComponent from '../../components/TableScheduleComponent/TableScheduleComponent';
import { getOrders } from '../../service/orders';
import { AppStateType } from '../../store/store';
import moment from 'moment';

const MyOrders: React.FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: AppStateType) => state.orderList.orders);
    const isLoading = useSelector((state: AppStateType) => state.orderList.isLoading);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    if (isLoading) {
        return <Card>Loading...</Card>;
    }

    return (
        <Card>
            <CardHeader title="Мои заказы"></CardHeader>
            <CardContent>
                <ScheduleComponent>
                    <Inject services={[Day]} />
                </ScheduleComponent>
            </CardContent>
        </Card>
    );
};

export default MyOrders;
