import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
} from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import useModalStyles from './modalStyles';

interface ModalProps {
    header: string;
    isOpen: boolean;
    isEdit: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    save?: (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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
            <Divider className={classes.modalHeader} />
            <Button
                color="secondary"
                variant="contained"
                className={classes.closeBtn}
                style={{ position: 'absolute', right: '1.5rem', top: '1rem' }}
                onClick={closeModal}
            >
                <CloseIcon />
            </Button>
            <DialogContent className={classes.content}>
                {children}
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button color="secondary" variant='contained' onClick={closeModal}>
                    Отменить
                </Button>
                <Button  color="primary" variant='contained'  onClick={save}>{isEdit ? 'Сохранить' : 'Подтвердить'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
