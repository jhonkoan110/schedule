import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLocation, updateLocation } from '../../../service/locations';
import { ILocation } from '../../../store/locations/types';
import { ILocationTypes } from '../../../store/locationTypes/types';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal';
import Modal from '../../Modal/Modal';
import useStyles from './infoModalStyle';

interface InfoModalProps {
    location: ILocation;
    header: string;
    isOpen: boolean;
    location_types: ILocationTypes[];
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    location,
    header,
    isOpen,
    location_types,
    closeModal,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const [isSelectTypeOpen, setIsSelectTypeOpen] = useState(false);
    const [location_type, setLocation_type] = useState<string | number>('');

    const [locationData, setLocationData] = useState(location);

    // Отркыть окно удаления
    const openDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenDeleteModal(true);
    };

    // Заркыть окно удаления
    const closeDeleteModalHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsOpenDeleteModal(false);
    };

    // Удалить локацию
    const deleteLocationHandler = (id: number) => {
        dispatch(deleteLocation(id));
        setIsOpenDeleteModal(false);
    };

    // Закрыть окно редактирования
    const openEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(true);
    };
    // Закрыть окно редактирования
    const closeEditModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenEditModal(false);
    };

    // Обработчик инпутов редактирования
    const editModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationData({
            ...locationData,
            [e.target.id]: e.target.value,
        });
    };

    // Закрыть селект типа
    const closeSelectTypeHandler = () => {
        setIsSelectTypeOpen(false);
    };

    // Открыть селект типа
    const openSelectTypeHandler = () => {
        setIsSelectTypeOpen(true);
    };

    // Обработка селекта типа
    const changeSelectTypeHandler = (event: any) => {
        console.log(event.target.value);
        setLocation_type(event.target.value);
    };

    // Обновить локацию
    // const updateLocationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     const updatedLocation: ILocation = {
    //         id: locationData.id,
    //         name: locationData.name,
    //         coordinates: locationData.coordinates,
    //         location_type: {
    //             id: +location_type,
    //             name: '',
    //         },
    //         parent: null,
    //     };

    //     dispatch(updateLocation(updatedLocation));
    //     setIsOpenEditModal(false);
    // };

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
                            <ListItemText primary={location.name} />
                        </ListItem>
                    </List>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={location.coordinates} />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                        onClick={openEditModalHandler}
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
            </Dialog>

            {isOpenDeleteModal && (
                <DeleteModal
                    header="Удаление услуги"
                    isOpen={isOpenDeleteModal}
                    text={location.name}
                    closeModal={closeDeleteModalHandler}
                    apply={() => deleteLocationHandler(location.id)}
                />
            )}

            {isOpenEditModal && (
                <Modal
                    header="Редактировать локацию"
                    isOpen={isOpenEditModal}
                    isEdit={true}
                    closeModal={closeEditModalHandler}
                    // save={updateLocationHandler}
                >
                    <TextField
                        id="name"
                        label="Название"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={locationData.name}
                        onChange={editModalChangeHandler}
                    />
                    <TextField
                        id="coordinates"
                        label="Координаты"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={locationData.coordinates}
                        onChange={editModalChangeHandler}
                    />
                    <FormControl>
                        <InputLabel id="location_type_edit_id_label">
                            Тип локации
                        </InputLabel>
                        <Select
                            labelId="location_type_edit_id_label"
                            id="location_type_edit-open-select"
                            open={isSelectTypeOpen}
                            onClose={closeSelectTypeHandler}
                            onOpen={openSelectTypeHandler}
                            value={location_type}
                            onChange={changeSelectTypeHandler}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {location_types.map((item: ILocationTypes) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Modal>
            )}
        </>
    );
};

export default InfoModal;
