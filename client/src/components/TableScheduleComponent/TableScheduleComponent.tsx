import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import React from 'react';

interface IProps {
    orders: Array<any>;
}

const TableScheduleComponent: React.FC<IProps> = ({ orders }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Наименование заказа </TableCell>
                        <TableCell align="right">07:00</TableCell>
                        <TableCell align="right">08:00</TableCell>
                        <TableCell align="right">09:00</TableCell>
                        <TableCell align="right">10:00</TableCell>
                        <TableCell align="right">11:00</TableCell>
                        <TableCell align="right">12:00</TableCell>
                        <TableCell align="right">13:00</TableCell>
                        <TableCell align="right">14:00</TableCell>
                        <TableCell align="right">15:00</TableCell>
                        <TableCell align="right">16:00</TableCell>
                        <TableCell align="right">17:00</TableCell>
                        <TableCell align="right">18:00</TableCell>
                        <TableCell align="right">19:00</TableCell>
                        <TableCell align="right">20:00</TableCell>
                        <TableCell align="right">21:00</TableCell>
                        <TableCell align="right">22:00</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order: any) => {
                        return (
                            <TableRow key={order.id}>
                                <TableCell align="right">{order.commentary}</TableCell>
                                <TableCell align="right">{order.description}</TableCell>
                                <TableCell align="right">{order.start_date}</TableCell>
                                <TableCell align="right">{order.end_date}</TableCell>
                            </TableRow>
                        );
                    })}
                    {/* {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableScheduleComponent;
