import {
    Card,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocations } from '../../../../service/locations';
import { getAllSpecializations } from '../../../../service/specializations';
import { ILocation } from '../../../../store/locations/types';
import { ISpecialization } from '../../../../store/specializtions/types';
import { AppStateType } from '../../../../store/store';
import Block from '../../../Block/Block';
import Loader from '../../../Loader/Loader';

interface LocationSelectProps {
    transferLocation: Dispatch<any>;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
    transferLocation,
}) => {
    const dispatch = useDispatch();

    const locations = useSelector(
        (state: AppStateType) => state.locationList.locations
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.locationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.locationList.error
    );

    const [isSelectLocationOpen, setIsSelectLocationOpen] = useState<boolean>(
        false
    );

    const [selectedLocation, setSelectedLocation] = useState<number>(0);

    // Закрыть селект локации
    const closeSelectLocationHandler = (e: any) => {
        setIsSelectLocationOpen(false);
    };

    // Открыть селект локации
    const openSelectLocationHandler = (e: any) => {
        setIsSelectLocationOpen(true);
    };

    // Обработчик селекта локации
    const changeSelectLocationHandler = (e: any) => {
        setSelectedLocation(e.target.value);
        transferLocation(e.target.value);
    };

    useEffect(() => {
        dispatch(getAllLocations());
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Block>
                <Card>
                    <CardHeader title={error} />
                </Card>
            </Block>
        );
    }

    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id="location_label">Выбрать локацию</InputLabel>
            <Select
                style={{ marginBottom: '1rem ' }}
                labelId="location_label"
                id="location-open-select"
                open={isSelectLocationOpen}
                onClose={closeSelectLocationHandler}
                onOpen={openSelectLocationHandler}
                value={selectedLocation}
                onChange={changeSelectLocationHandler}
                defaultValue=""
            >
                {!locations.length ? (
                    <MenuItem value={0}>
                        <em>Нет доступных локаций</em>
                    </MenuItem>
                ) : (
                    <MenuItem value={0}>
                        <em>Выбрать локацию</em>
                    </MenuItem>
                )}
                {locations.map((location: ILocation) => {
                    return (
                        <MenuItem key={location.id} value={location.id}>
                            {location.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default LocationSelect;
