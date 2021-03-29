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
import Address from '../../components/Address/Address';
import Loader from '../../components/Loader/Loader';
import ImageAdder from '../../components/ImageUploader/ImageUploader';
import { createOrder } from '../../service/orders';

// ==================================================== TABS ==================================

// ==================================================== TABS END ==================================

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
        location: null
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
            status: 'Обработка заказа диспетчером'
        };
        console.log(newOrder);
        dispatch(createOrder(newOrder));
        dispatch(getOrdersByUserId(authData.user.id))
    };

    // Стейт модальных окон
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

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
        console.log(orderData);
    };

    // Загрузить заказы по id пользователя
    useEffect(() => {
        dispatch(getOrdersByUserId(authData.user.id));
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
                                    // onClick={() => selectLocationHandler(item)}
                                >
                                    <ListItemText primary={item.description} />
                                    <ListItemText primary={item.status} />
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
                    id="commentary"
                    label="Комментарий"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={orderData.commentary}
                    onChange={addModalChangeHandler}
                />
                <Address transferAddress={setAddress} />
                <ImageAdder
                    imagePreviewUrl={imagePreviewUrl}
                    setImagePreviewUrl={setImagePreviewUrl}
                    setFile={setFile}
                />
            </Modal>
        </>
    );
};

export default MyOrders;
