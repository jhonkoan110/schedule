import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { Dispatch, useState } from 'react';
import { ILocation } from '../../../store/locations/types';
import { useStyles } from './addressSelectsStyles';

interface DistrictSelectProps {
    houses: any;
    transferHouseId: Dispatch<any>;
}

const HouseSelect: React.FC<DistrictSelectProps> = ({
    houses,
    transferHouseId,
}) => {
    const classes = useStyles();

    const [house, setHouse] = useState<string | number>(0);
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
        setHouse(event.target.value);
        // const streetById = .filter(
        //     (item: any) => item.id === event.target.value
        // );
        // if (streetById[0]) {
        //     transferHouses(streetById[0].children);
        // }
    };

    return (
        <FormControl className={classes.form}>
            <InputLabel id="house_edit_id_label">Дом</InputLabel>
            <Select
                labelId="house_edit_id_label"
                id="house_edit-open-select"
                open={isSelectOpen}
                onClose={closeSelectHandler}
                onOpen={openSelectHandler}
                value={house}
                onChange={changeSelectHandler}
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
                {houses.map((house: ILocation) => {
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

export default HouseSelect;
