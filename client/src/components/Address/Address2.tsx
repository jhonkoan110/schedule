import { Button } from '@material-ui/core';
import React, { Dispatch, useState } from 'react';
import District from './District';
import House from './House';
import Street from './Street';

interface AddressProps {
    transferLocation: Dispatch<any>;
}

const Address2: React.FC<AddressProps> = ({ transferLocation }) => {
    const [district, setDistrict] = useState();
    const [street, setStreet] = useState();
    const [house, setHouse] = useState();

    const applyAddressHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        transferLocation({
            district,
            street,
            house,
        });
    };

    return (
        <>
            <District transferDistrictName={setDistrict} />
            <Street transferStreetName={setStreet} />   
            <House transferHouseName={setHouse} />
            <Button
                variant="contained"
                color="primary"
                onClick={applyAddressHandler}
            >
                Подтвердить адрес
            </Button>
        </>
    );
};

export default Address2;
