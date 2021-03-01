import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import useModalStyles from './modalStyles';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
    const classes = useModalStyles();

    return (
        <Dialog open={isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <Button
                color="secondary"
                variant="contained"
                className={classes.closeBtn}
                style={{ position: 'absolute', right: '1rem', top: '1rem' }}
                onClick={closeModal}>
                <CloseIcon />
            </Button>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button color="primary">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
