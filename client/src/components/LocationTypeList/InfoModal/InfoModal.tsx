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
import {
    deleteLocationType,
    updateLocationType,
} from '../../../service/locationTypes';
import { ILocationTypes } from '../../../store/locationTypes/types';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import Modal from '../../Modal/Modal';
import EditModal from '../../SpecializationList/EditModal/EditModal';
import useStyles from './infoModalStyle';

interface InfoModalProps {
    id: number;
    name: string;
    header: string;
    isOpen: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    id,
    name,
    header,
    isOpen,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [locationTypeName, setLocationTypeName] = useState(name);

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
    const openEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(true);
    };

    // Закрыть модальное окно редактирования
    const closeEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(false);
    };

    // Удалить тип локации
    const deleteLocationTypeHandler = (id: number) => {
        dispatch(deleteLocationType(id));
        setIsOpenDeleteModal(false);
    };

    // Обработчик инпута редактирования
    const editModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationTypeName(e.target.value);
    };

    // Обновить тип локации
    const updateLocationTypeHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const updatedLocationType: ILocationTypes = {
            id,
            name: locationTypeName,
        };
        console.log(updatedLocationType);
        
        dispatch(updateLocationType(updatedLocationType));
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

            <DeleteModal
                header="Удаление типа локации"
                isOpen={isOpenDeleteModal}
                text={name}
                closeModal={closeDeleteModalHandler}
                apply={() => deleteLocationTypeHandler(id)}
            />

            <Modal
                header="Редактировать тип локации"
                isOpen={isOpenEditModal}
                isEdit={true}
                closeModal={closeEditModalHandler}
                save={updateLocationTypeHandler}
            >
                <TextField
                    id="name"
                    label="Название"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={locationTypeName}
                    onChange={editModalChangeHandler}
                />
            </Modal>
        </>
    );
};

export default InfoModal;
