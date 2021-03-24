import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMaster } from '../../../service/masters';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import useStyles from './infoModalStyles';

interface InfoModalProps {
    master: any;
    header: string;
    isOpen: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    master,
    header,
    isOpen,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

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

    // Удалить мастера
    const deleteMasterHandler = (id: number) => {
        dispatch(deleteMaster(id));
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
                            <ListItemText primary={master.user.login} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={master.user.firstname} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={master.user.lastname} />
                        </ListItem>
                    </List>

                    <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                        // onClick={openEditModalHandler}
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
                    header="Удаление мастера"
                    isOpen={isOpenDeleteModal}
                    text={master.user.login}
                    closeModal={closeDeleteModalHandler}
                    apply={() => deleteMasterHandler(master.id)}
                />
            )}
        </>
    );
};

export default InfoModal;
