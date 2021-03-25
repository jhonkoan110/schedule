import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Day, Inject } from '@syncfusion/ej2-react-schedule';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../store/store';
import Block from '../../components/Block/Block';
import { getOrdersByUserId } from '../../service/myOrders';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';

// ==================================================== TABS ==================================



// ==================================================== TABS END ==================================

const MyOrders: React.FC = () => {
    const dispatch = useDispatch();

    const myOrders = useSelector(
        (state: AppStateType) => state.myOrderList.myOrders
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.myOrderList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.myOrderList.error);
    const authData = useSelector((state: AppStateType) => state.auth.authData);

    // Стейт заказа
    const [orderData, setOrderData] = useState({
        id: 0,
        master: 0,
        user: 0,
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        status_color: '',
        commentary: '',
        photo: '',
    });

    // Стейт файла
    const [file, setFile] = useState<any>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<any>('');

    // Обработчик инпута картинки
    const imageChangeHandler = (event: any) => {
        // let reader = new FileReader();
        // let test = e.target.files[0];
        // setFile(test);
        // console.log(file);

        var temp = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            if (event.target) {
                console.log(event.target.result);
                setFile(temp)
                setImagePreviewUrl(event.target.result)
            } else {
                console.log('null blyat');
                
            }
        };

        reader.readAsDataURL(temp);

        // reader.onload = (e: any) => {
        //     setFile(file);
        //     setImagePreviewUrl(reader.result);
        //     console.log(e.target.result)
        // };
    };

    // Сделать заказ
    const createOrderHandler = (e: any) => {
        console.log('handle uploading-', file);
        console.log(String(imagePreviewUrl));
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
    };

    // Загрузить заказы по id пользователя
    useEffect(() => {
        dispatch(getOrdersByUserId(authData.user.id));
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
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
                                // className={classes.addButton}
                            >
                                Сделать заказ
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
                                </ListItem>
                            );
                        })}
                    </List>
                </CardContent>
            </Block>

            
                <Modal
                    header="Создание заказа"
                    isOpen={isOpenAddModal}
                    isEdit={false}
                    closeModal={closeAddModalHandler}
                    save={createOrderHandler}
                >
                    
                </Modal>
            
        </>
    );
};

export default MyOrders;
