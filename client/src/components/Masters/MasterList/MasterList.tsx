import {
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMaster, getAllMasters } from '../../../service/masters';
import { AppStateType } from '../../../store/store';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import InfoModal from '../InfoModal/infoModal';
import LocationSelect from './LocationSelect/LocationSelect';
import useStyles from './masterListStyles';
import SpecializationSelect from './SpecializationSelect/SpecializationSelect';
import UserSelect from './UserSelect/UserSelect';

const MasterList: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const masters = useSelector(
        (state: AppStateType) => state.masterList.masters
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.masterList.isLoading
    );
    const error = useSelector((state: AppStateType) => state.masterList.error);

    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState<any>();
    const [selectedSpecialization, setSelectedSpecializtion] = useState<any>();
    const [selectedLocation, setSelectedLocation] = useState<any>();

    const [masterData, setMasterData] = useState({
        id: 0,
        user: 0,
        specialization: 0,
        location: 0,
    });

    // Открыть окно добавления
    const openAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(true);
    };

    // Закрыть окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAddModal(false);
    };

    // Закрыть окно информации
    const closeInfoModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenInfoModal(false);
    };

    // Выбрать мастера
    const selectMasterHandler = (master: any) => {
        setMasterData(master);
        setIsOpenInfoModal(true);
    };

    // Создать мастера
    const createMasterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newMaster = {
            user: selectedUser,
            specialization: selectedSpecialization,
            location: selectedLocation,
        };
        dispatch(createMaster(newMaster));
    };

    // Загрузить всех мастеров
    useEffect(() => {
        dispatch(getAllMasters());
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Typography variant="body1">{error}</Typography>;
    }

    return (
        <>
            <List className={classes.list}>
                <ListItem>
                    <Button
                        onClick={openAddModalHandler}
                        variant="contained"
                        color="primary"
                        className={classes.addButton}
                    >
                        Добавить
                    </Button>
                </ListItem>
                {masters.map((item: any) => {
                    return (
                        <ListItem
                            button
                            key={item.id}
                            onClick={() => selectMasterHandler(item)}
                        >
                            <ListItemText primary={item.user.login} />
                        </ListItem>
                    );
                })}
            </List>

            {isOpenAddModal && (
                <Modal
                    header="Добавить мастера"
                    isOpen={isOpenAddModal}
                    isEdit={true}
                    closeModal={closeAddModalHandler}
                    save={createMasterHandler}
                >
                    <UserSelect transferSelectedUser={setSelectedUser} />
                    <SpecializationSelect
                        transferSelectedSpecialization={
                            setSelectedSpecializtion
                        }
                    />
                    <LocationSelect transferLocation={setSelectedLocation} />
                </Modal>
            )}

            {isOpenInfoModal && (
                <InfoModal
                    master={masterData}
                    header="Информация о мастере"
                    isOpen={isOpenInfoModal}
                    closeModal={closeInfoModalHandler}
                />
            )}
        </>
    );
};

export default MasterList;
