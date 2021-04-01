import { TextField } from '@material-ui/core';
import React from 'react';
import Modal from '../../../Modal/Modal';
import useStyles from '../../InfoModal/infoModalStyle';

interface AddModalProps {
    headerText: string;
    isOpen: boolean;
    locationData: any,
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    createLocation: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddModal: React.FC<AddModalProps> = ({
    headerText,
    isOpen,
    closeModal,
    createLocation,
    locationData,
    onChange,
}) => {
    const classes = useStyles();

    return (
        <Modal
            header={`Создание ${headerText}`}
            isOpen={isOpen}
            isEdit={false}
            closeModal={closeModal}
            save={createLocation}
        >
            <TextField
                id="name"
                label="Название"
                className={classes.input}
                required
                variant="outlined"
                value={locationData.name}
                onChange={onChange}
            />
            <TextField
                id="coordinates"
                label="Координаты"
                className={classes.input}
                type="number"
                required
                variant="outlined"
                value={locationData.coordinates}
                onChange={onChange}
            />
        </Modal>
    );
};

export default AddModal;
