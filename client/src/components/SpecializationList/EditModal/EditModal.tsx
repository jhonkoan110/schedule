import { TextField } from '@material-ui/core';
import React from 'react';
import useStyles from '../../../pages/Auth/Registration/style';
import Modal from '../../Modal/Modal';

interface EditModalProps {
    header: string;
    isOpen: boolean;
    isEdit: boolean;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    save: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const EditModal: React.FC<EditModalProps> = ({
    header,
    isOpen,
    isEdit,
    closeModal,
    save,
}) => {
    const classes = useStyles();

    return (
        <Modal
            header={header}
            isOpen={isOpen}
            isEdit={isEdit}
            closeModal={closeModal}
            save={save}
        >
            {/* <TextField
                    id="name"
                    label="Название"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={specializationData.name}
                    onChange={modalChangeHandler}
                />
                <TextField
                    id="icon"
                    label="Иконка"
                    className={classes.input}
                    required
                    variant="outlined"
                    value={specializationData.icon}
                    onChange={modalChangeHandler}
                /> */}
        </Modal>
    );
};

export default EditModal;
