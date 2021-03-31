import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocations } from '../../service/locations';
import { AppStateType } from '../../store/store';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';

interface StreetProps {
    transferStreetName: Dispatch<any>;
}

const Street: React.FC<StreetProps> = ({ transferStreetName }) => {
    const locations = useSelector(
        (state: AppStateType) => state.locationList.locations
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.locationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.locationList.error
    );

    const dispatch = useDispatch();
    const [selectedStreet, setSelectedStreet] = useState<number>(0);
    const [isSelectStreetOpen, setIsSelectStreetOpen] = useState(false);
    const [streets, setStreets] = useState(
        locations.filter((location: any) => location.location_type_id === 3)
    );

    // Закрыть селект района
    const closeSelectStreetHandler = (e: any) => {
        setIsSelectStreetOpen(false);
    };

    // Открыть селект района
    const openSelectStreetHandler = (e: any) => {
        setIsSelectStreetOpen(true);
    };

    // Обработчик селектора района
    const changeSelectStreetHandler = (e: any) => {
        setSelectedStreet(e.target.value);
        transferStreetName(e.target.value);
    };

    useEffect(() => {
        dispatch(getAllLocations());
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id="user_label">Выбрать улицу</InputLabel>
            <Select
                style={{ marginBottom: '1rem ' }}
                labelId="user_label"
                id="user-open-select"
                open={isSelectStreetOpen}
                onClose={closeSelectStreetHandler}
                onOpen={openSelectStreetHandler}
                value={selectedStreet}
                onChange={changeSelectStreetHandler}
                defaultValue=""
            >
                {!streets.length ? (
                    <MenuItem value={0}>
                        <em>Нет доступных улиц</em>
                    </MenuItem>
                ) : (
                    <MenuItem value={0}>
                        <em>Выбрать улицу</em>
                    </MenuItem>
                )}
                {streets.map((street: any) => {
                    return (
                        <MenuItem key={street.id} value={street.id}>
                            {street.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default Street;
