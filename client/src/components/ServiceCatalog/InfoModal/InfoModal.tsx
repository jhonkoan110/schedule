import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteServiceCatalog,
    updateServiceCatalog,
} from '../../../service/serviceCatalog';
import { IServiceCatalog } from '../../../store/serviceCatalog/types';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import useStyles from '../../Modal/infoModalStyle';
import Modal from '../../Modal/Modal';

interface InfoModalProps {
    serviceCatalog: IServiceCatalog;
    header: string;
    isOpen: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    serviceCatalog,
    header,
    isOpen,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const [service, setService] = useState(serviceCatalog);

    // Отркыть окно удаления
    const openDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(true);
    };

    // Заркыть окно удаления
    const closeDeleteModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsOpenDeleteModal(false);
    };

    // Удалить услугу
    const deleteServiceCatalogHandler = (id: number) => {
        dispatch(deleteServiceCatalog(id));
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

    // Обработка инпутов в окне редактирования
    const editModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setService({
            ...service,
            [e.target.id]: e.target.value,
        });
    };

    // Обновить услугу
    const updateServiceCatalogHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        dispatch(updateServiceCatalog(service));
    };

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
                            <ListItemText primary={serviceCatalog.name} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText
                                primary={serviceCatalog.price + '₽'}
                            />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={serviceCatalog.duration} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText
                                primary={serviceCatalog.specialization.name}
                            />
                        </ListItem>
                    </List>
                    <DialogActions className={classes.actions}>
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
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {isOpenDeleteModal && (
                <DeleteModal
                    header="Удаление услуги"
                    isOpen={isOpenDeleteModal}
                    text={serviceCatalog.name}
                    closeModal={closeDeleteModalHandler}
                    apply={() => deleteServiceCatalogHandler(serviceCatalog.id)}
                />
            )}

            {isOpenEditModal && (
                <Modal
                    header="Редактировать тип локации"
                    isOpen={isOpenEditModal}
                    isEdit={true}
                    closeModal={closeEditModalHandler}
                    save={updateServiceCatalogHandler}
                >
                    <TextField
                        id="name"
                        label="Название"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={service.name}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="price"
                        label="Стоимость"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={service.price}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="duration"
                        label="Длительность"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={service.duration}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="specialization"
                        label="Специализация"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={service.specialization}
                        onChange={editModalChangeHandler}
                    />
                </Modal>
            )}
        </>
    );
};

export default InfoModal;
