import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../../../components/Modal/infoModalStyle';
import Modal from '../../../components/Modal/Modal';

interface CancelModalProps {
    isOpen: boolean;
    comment: string;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    save?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CancelModal: React.FC<CancelModalProps> = ({
    isOpen,
    comment,
    closeModal,
    save,
    onCommentChange,
}) => {
    const classes = useStyles();

    return (
        <Modal
            header="Отмена заказа"
            isOpen={isOpen}
            isEdit={false}
            closeModal={closeModal}
            save={save}
        >
            <TextField
                id="commentary"
                label="Комментарий"
                className={classes.input}
                required
                variant="outlined"
                value={comment}
                onChange={onCommentChange}
            />
            <Typography>Заказ перейдёт в статус "отклонён".</Typography>
            <Typography>Уверены, что хотите отменить заказ?</Typography>
        </Modal>
    );
};

export default CancelModal;
