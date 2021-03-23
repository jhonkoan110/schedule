import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import useModalStyles from './modalStyles';

interface ModalProps {
    header: string;
    isOpen: boolean;
    isEdit: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    save: (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Modal: React.FC<ModalProps> = ({
    header,
    isOpen,
    closeModal,
    save,
    children,
    isEdit
}) => {
    const classes = useModalStyles();

    return (
        <Dialog fullWidth={true} open={isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{header}</DialogTitle>
            <Button
                color="secondary"
                variant="contained"
                className={classes.closeBtn}
                style={{ position: 'absolute', right: '1rem', top: '1rem' }}
                onClick={closeModal}
            >
                <CloseIcon />
            </Button>
            <DialogContent className={classes.content}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={closeModal}>
                    Отменить
                </Button>
                <Button  color="primary" onClick={save}>{isEdit ? 'Сохранить' : 'Да'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
