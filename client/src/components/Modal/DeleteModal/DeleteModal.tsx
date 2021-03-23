import { Typography } from '@material-ui/core';
import React from 'react';
import Modal from '../Modal';

interface DeleteModalProps {
    header: string;
    isOpen: boolean;
    text:string;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    apply: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    header,
    isOpen,
    text,
    closeModal,
    apply,
}) => {
    return (
        <Modal
            header={header}
            isOpen={isOpen}
            isEdit={false}
            closeModal={closeModal}
            save={apply}
        >
            <Typography variant='body1'>Вы действительно хотите удалить {text}?</Typography>
        </Modal>
    );
};

export default DeleteModal;
