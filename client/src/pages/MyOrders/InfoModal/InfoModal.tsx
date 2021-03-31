import {
    Button,
    Card,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Address from '../../../components/Address/Address';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import useStyles from '../../../components/Modal/infoModalStyle';
import Modal from '../../../components/Modal/Modal';
import { StatusColors } from '../../../constants/constants';
import { getAllOrders, updateOrder } from '../../../service/orders';
import CancelModal from '../CancelModal/CancelModal';

interface InfoModalProps {
    imageUrl: string;
    order: any;
    header: string;
    isOpen: boolean;
    setIsOpen: Dispatch<any>;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    order,
    imageUrl,
    header,
    isOpen,
    setIsOpen,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // Стейт фото пользователя
    const [file, setFile] = useState<any>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(order.photo);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
    const [comment, setComment] = useState<string>(order.commentary);
    const [orderData, setOrderData] = useState<any>(order);

    // Отркыть окно обновления
    const openUpdateModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsUpdateModalOpen(true);
    };

    // Заркыть окно обновления
    const closeUpdateModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsUpdateModalOpen(false);
    };

    // Открыть окно отмены заказа
    const openCancelModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsCancelModalOpen(true);
    };

    // Закрыть окно отмены заказа
    const closeCancelModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsCancelModalOpen(false);
    };

    // Адрес
    const [address, setAddress] = useState({
        district: '',
        street: '',
        house: '',
    });

    // Обработчик комментария
    const commentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    // Обработчик окна информации
    const updateModalChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setOrderData({
            ...orderData,
            [e.target.id]: e.target.value,
        });
    };

    // Обновить заказ
    const updateOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const updatedOrder = {
            ...orderData,
            location: address,
            status: 'Обработка заказа диспетчером',
            status_color: StatusColors.ORDER_PROCESSING,
        };

        console.log(updatedOrder);

        dispatch(updateOrder(updatedOrder));
    };

    // Отклонить заказ
    const cancelOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const cancelledOrder = {
            ...order,
            commentary: comment,
            status: 'Отклонён клиентом',
            status_color: StatusColors.REJECTED,
        };

        console.log(cancelledOrder);

        dispatch(updateOrder(cancelledOrder));
        setIsCancelModalOpen(false);
        setIsOpen(false);
    };

    return (
        <>
            <Dialog
                fullWidth={true}
                onClose={closeModal}
                aria-labelledby="order-title"
                open={isOpen}
            >
                <DialogTitle id="order-title">{header}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="description"
                        label="Описание заказа"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={orderData.description}
                        onChange={updateModalChangeHandler}
                    />
                    <form noValidate>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="start_date"
                            label="Дата начала"
                            type="datetime-local"
                            value={orderData.start_date}
                            onChange={updateModalChangeHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="end_date"
                            value={orderData.end_date}
                            label="Дата окончания"
                            type="datetime-local"
                            onChange={updateModalChangeHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="address"
                            value={orderData.address}
                            label="Адрес"
                            onChange={updateModalChangeHandler}
                        />
                    </form>
                    <ImageUploader
                        imagePreviewUrl={imagePreviewUrl}
                        setImagePreviewUrl={setImagePreviewUrl}
                        setFile={setFile}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                        onClick={openUpdateModalHandler}
                    >
                        Обновить
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={openCancelModalHandler}
                    >
                        Отказаться
                    </Button>
                </DialogActions>
            </Dialog>

            {isUpdateModalOpen && (
                <Modal
                    header="Обновление заказа"
                    isOpen={isUpdateModalOpen}
                    isEdit={false}
                    closeModal={closeUpdateModalHandler}
                    save={updateOrderHandler}
                >
                    <Typography>
                        Заказ перейдёт в статус обработки оператором.
                    </Typography>
                    <Typography>Уверены, что хотите обновить заказ?</Typography>
                </Modal>
            )}

            {isCancelModalOpen && (
                <CancelModal
                    isOpen={isCancelModalOpen}
                    comment={comment}
                    closeModal={closeCancelModalHandler}
                    save={cancelOrderHandler}
                    onCommentChange={commentChangeHandler}
                />
            )}
        </>
    );
};

export default InfoModal;
