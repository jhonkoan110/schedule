import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { Dispatch, useState } from 'react';
import { ILocation } from '../../../store/locations/types';
import { useStyles } from './addressSelectsStyles';

interface DistrictSelectProps {
    streets: any;
    transferHouses: Dispatch<any>;
}

const StreetSelect: React.FC<DistrictSelectProps> = ({
    streets,
    transferHouses,
}) => {
    const classes = useStyles();

    const [street, setStreet] = useState<string | number>(0);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

    // Открыть селект
    const openSelectHandler = (e: any) => {
        setIsSelectOpen(true);
    };

    // Закрыть селект
    const closeSelectHandler = (e: any) => {
        setIsSelectOpen(false);
    };

    // Обработка селекта
    const changeSelectHandler = (event: any) => {
        console.log(event.target.value);
        setStreet(event.target.value);
        const streetById = streets.filter(
            (item: any) => item.id === event.target.value
        );
        if (streetById[0]) {
            transferHouses(streetById[0].children);
        }
    };

    return (
        <FormControl className={classes.form}>
            <InputLabel id="street_edit_id_label">Улица</InputLabel>
            <Select
                labelId="street_edit_id_label"
                id="street_edit-open-select"
                open={isSelectOpen}
                onClose={closeSelectHandler}
                onOpen={openSelectHandler}
                value={street}
                onChange={changeSelectHandler}
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
                {streets.map((street: ILocation) => {
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

export default StreetSelect;
