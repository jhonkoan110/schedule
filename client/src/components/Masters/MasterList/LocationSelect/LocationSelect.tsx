import {
    Card,
    CardHeader,
} from '@material-ui/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocations } from '../../../../service/locations';
import { AppStateType } from '../../../../store/store';
import Address from '../../../Address/Address';
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

    const [locationID, setLocationID] = useState(0);

    useEffect(() => {
        dispatch(getAllLocations());
    }, [dispatch]);

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

    return <Address transferLocationID={setLocationID} />;
};

export default LocationSelect;
