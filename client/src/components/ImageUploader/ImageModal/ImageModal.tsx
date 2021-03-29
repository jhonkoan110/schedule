import {
    Button,
    Card,
    CardMedia,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
} from '@material-ui/core';
import { useStyles } from './imageModalStyles';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

interface ImageModalProps {
    image: string;
    isOpen: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
    image,
    isOpen,
    closeModal,
}) => {
    const classes = useStyles();

    return (
        <Dialog
            fullWidth={true}
            open={isOpen}
            aria-labelledby="image-modal-title"
        >
            <DialogTitle id="image-modal-title">Ваше фото</DialogTitle>
            <Divider className={classes.modalHeader} />
            <Button
                color="secondary"
                variant="contained"
                style={{ position: 'absolute', right: '1.5rem', top: '1rem' }}
                onClick={closeModal}
            >
                <CloseIcon />
            </Button>
            <DialogContent>
                <Card elevation={0}>
                    <CardMedia
                        image={image}
                        title="фото"
                        className={classes.image}
                    />
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;
