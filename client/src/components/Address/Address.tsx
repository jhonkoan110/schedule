import { Button } from '@material-ui/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LocationTypes } from '../../constants/constants';
import { getAllLocations } from '../../service/locations';
import { ILocation } from '../../store/locations/types';
import { AppStateType } from '../../store/store';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import DistrictSelect from './AddressSelects/DistrictSelect';
import StreetSelect from './AddressSelects/StreetSelect';
import HouseSelect from './AddressSelects/HouseSelect';

interface AddressProps {
    transferLocationID: Dispatch<any>;
}

const Address: React.FC<AddressProps> = ({transferLocationID}) => {
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

    const [streets, setStreets] = useState<any>();
    const [houses, setHouses] = useState<any>();

    // Загрузка всех локаций
    useEffect(() => {
        dispatch(getAllLocations());
    }, [dispatch]);

    if (isLoading) return <Loader />;
    if (error) return <Error error={error} />;

    return (
        <>
            <DistrictSelect
                transferStreets={setStreets}
                districts={locations.filter(
                    (item: ILocation) =>
                        item.location_type_id === LocationTypes.DISTRICT
                )}
            />
            {streets && streets.length && (
                <StreetSelect streets={streets} transferHouses={setHouses} />
            )}
            {houses && houses.length && (
                <HouseSelect houses={houses} transferHouseId={transferLocationID} />
            )}
            <Button onClick={() => console.log(houses)}>Дома в консоль</Button>
        </>
    );
};

export default Address;
