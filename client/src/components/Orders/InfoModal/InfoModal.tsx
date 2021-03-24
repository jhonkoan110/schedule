import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrder, updateOrder } from '../../../service/orders';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import Modal from '../../Modal/Modal';
import useStyles from './infoModalStyle';

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

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const [orderData, setOrderData] = useState(order);

    // Открыть окно удаления
    const openDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(true);
    };

    // Закрыть окно удаления
    const closeDeleteModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsOpenDeleteModal(false);
    };

    // Удалить заказ
    const deleteOrderHandler = (id: number) => {
        dispatch(deleteOrder(id));
        setIsOpenDeleteModal(false);
    };

    // Открыть окно редактирования
    const openEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(true);
    };

    // Закрыть окно редактирования
    const closeEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(false);
    };

    // Обработчик инпутов окна редактирования
    const editModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({
            ...orderData,
            [e.target.id]: e.target.value,
        });
    };

    // Обновить заказ
    const updateOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(updateOrder(orderData));
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
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={order.description} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={order.start_date} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={order.end_date} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={order.status} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={order.status_color} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={order.commentary} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={order.photo} />
                        </ListItem>
                    </List>
                    <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                        onClick={openEditModalHandler}
                    >
                        Редактировать
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={openDeleteModalHandler}
                    >
                        Удалить
                    </Button>
                </DialogContent>
            </Dialog>

            {isOpenDeleteModal && (
                <DeleteModal
                    header="Удаление типа локации"
                    isOpen={isOpenDeleteModal}
                    text={order.description}
                    closeModal={closeDeleteModalHandler}
                    apply={() => deleteOrderHandler(order.id)}
                />
            )}

            {isOpenEditModal && (
                <Modal
                    header="Редактировать тип локации"
                    isOpen={isOpenEditModal}
                    isEdit={true}
                    closeModal={closeEditModalHandler}
                    save={updateOrderHandler}
                >
                    <TextField
                        id="description"
                        label="Описание"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.description}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="start_date"
                        label="Дата начала"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.start_date}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="end_date"
                        label="Дата окончания"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.end_date}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="status"
                        label="Статус"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.status}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="status_color"
                        label="Цвет статуса"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.status_color}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="commentary"
                        label="Комментарий"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.commentary}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="photo"
                        label="фото"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.photo}
                        onChange={editModalChangeHandler}
                    />
                </Modal>
            )}
        </>
    );
};

export default InfoModal;
