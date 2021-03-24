import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteSpecialization,
    updateSpecialization,
} from '../../../service/specializations';
import { ISpecialization } from '../../../store/specializtions/types';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import Modal from '../../Modal/Modal';
import useStyles from './infoModalStyle';

interface InfoModalProps {
    header: string;
    isOpen: boolean;
    id: number;
    name: string;
    icon: string;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    header,
    isOpen,
    id,
    name,
    icon,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [specializationData, setSpecializationData] = useState({
        id,
        name,
        icon,
    });

    // Открыть модальное окно удаления
    const openDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(true);
    };

    // Закрыть модальое окно удаления
    const closeDeleteModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsOpenDeleteModal(false);
    };

    // Открыть модальное окно редактирования
    const openEditModalhandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(true);
    };

    // Закрыть модальное окно редактирования
    const closeEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(false);
    };

    // Обработчик инпутов редактирования
    const editModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpecializationData({
            ...specializationData,
            [e.target.id]: e.target.value,
        });
    };

    // Удалить специализацию
    const deleteSpecizaliztionHandler = (id: number) => {
        console.log(id);

        dispatch(deleteSpecialization(id));
    };

    // Обновить спец-ю
    const updateSpecializationHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const updatedSpec: ISpecialization = {
            id: id,
            name: specializationData.name,
            icon: specializationData.icon,
        };

        console.log(updatedSpec);

        dispatch(updateSpecialization(updatedSpec));
        setIsOpenEditModal(false);
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
                            <ListItemText primary={name} />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <ListItemText primary={icon} />
                        </ListItem>
                    </List>
                    <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                        onClick={openEditModalhandler}
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
                    isOpen={isOpenDeleteModal}
                    header="Удаление специализации"
                    text={name}
                    closeModal={closeDeleteModalHandler}
                    apply={() => deleteSpecizaliztionHandler(id)}
                />
            )}

            {isOpenEditModal && (
                <Modal
                    isOpen={isOpenEditModal}
                    header="Редактирование специализации"
                    isEdit={true}
                    closeModal={closeEditModalHandler}
                    save={updateSpecializationHandler}
                >
                    <TextField
                        id="name"
                        label="Название"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={specializationData.name}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="icon"
                        label="Иконка"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={specializationData.icon}
                        onChange={editModalChangeHandler}
                    />
                </Modal>
            )}
        </>
    );
};

export default InfoModal;
