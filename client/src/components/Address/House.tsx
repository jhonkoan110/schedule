import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import { close } from 'node:inspector';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocations } from '../../service/locations';
import { AppStateType } from '../../store/store';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';

interface HouseProps {
    transferHouseName: Dispatch<any>;
}

const House: React.FC<HouseProps> = ({ transferHouseName }) => {
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
    const [selectedHouse, setSelectedHouse] = useState<number>(0);
    const [isSelectHouseOpen, setIsSelectHouseOpen] = useState(false);
    const [houses, setHouses] = useState(
        locations.filter((location: any) => location.location_type_id === 7)
    );

    // Закрыть селект района
    const closeSelectHouseHandler = (e: any) => {
        setIsSelectHouseOpen(false);
    };

    // Открыть селект района
    const openSelectHouseHandler = (e: any) => {
        setIsSelectHouseOpen(true);
    };

    // Обработчик селектора района
    const changeSelectHouseHandler = (e: any) => {
        setSelectedHouse(e.target.value);
        transferHouseName(e.target.value);
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
            <InputLabel id="user_label">Выбрать дом</InputLabel>
            <Select
                style={{ marginBottom: '1rem ' }}
                labelId="user_label"
                id="user-open-select"
                open={isSelectHouseOpen}
                onClose={closeSelectHouseHandler}
                onOpen={openSelectHouseHandler}
                value={selectedHouse}
                onChange={changeSelectHouseHandler}
                defaultValue=""
            >
                {!houses.length ? (
                    <MenuItem value={0}>
                        <em>Нет доступных домов</em>
                    </MenuItem>
                ) : (
                    <MenuItem value={0}>
                        <em>Выбрать дом</em>
                    </MenuItem>
                )}
                {houses.map((house: any) => {
                    return (
                        <MenuItem key={house.id} value={house.id}>
                            {house.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default House;
