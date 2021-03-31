import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../service/users';
import { IUser } from '../../../store/users/types';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import useStyles from '../../Modal/infoModalStyle';

interface InfoModalProps {
    user: IUser;
    header: string;
    isOpen: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    user,
    header,
    isOpen,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

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

    // Удалить пользователя
    const deleteUserHandler = (id: number) => {
        dispatch(deleteUser(id));
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
                            <ListItemText primary={user.login} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={user.firstname} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={user.lastname} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={user.middlename} />
                        </ListItem>
                    </List>
                    {user.role && (
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button>
                                <ListItemText primary={user.role.name} />
                            </ListItem>
                        </List>
                    )}

                    <DialogActions className={classes.actions}>
                        <Button
                            className={classes.buttonMargin}
                            variant="contained"
                            color="primary"
                            onClick={() => {}}
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
                    header="Удаление пользователя"
                    isOpen={isOpenDeleteModal}
                    text={user.login}
                    closeModal={closeDeleteModalHandler}
                    apply={() => deleteUserHandler(user.id)}
                />
            )}
        </>
    );
};

export default InfoModal;
