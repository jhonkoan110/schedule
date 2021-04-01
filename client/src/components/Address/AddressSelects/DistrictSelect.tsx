import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { Dispatch, useState } from 'react';
import { ILocation } from '../../../store/locations/types';
import { useStyles } from './addressSelectsStyles';

interface DistrictSelectProps {
    districts: any;
    transferStreets: Dispatch<any>;
}

const DistrictSelect: React.FC<DistrictSelectProps> = ({
    districts,
    transferStreets,
}) => {
    const classes = useStyles();

    const [district, setDistrict] = useState<string | number>('');
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
        setDistrict(event.target.value);
        const districtById = districts.filter(
            (item: any) => item.id === event.target.value
        );

        if (districtById[0]) {
            transferStreets(districtById[0].children);
        }
    };

    return (
        <FormControl className={classes.form}>
            <InputLabel id="district_edit_id_label">Район</InputLabel>
            <Select
                labelId="district_edit_id_label"
                id="district_edit-open-select"
                open={isSelectOpen}
                onClose={closeSelectHandler}
                onOpen={openSelectHandler}
                value={district}
                onChange={changeSelectHandler}
            >
                {!districts.length ? (
                    <MenuItem value={0}>
                        <em>Нет доступных районов</em>
                    </MenuItem>
                ) : (
                    <MenuItem value={0}>
                        <em>Выбрать район</em>
                    </MenuItem>
                )}
                {districts.map((district: ILocation) => {
                    return (
                        <MenuItem key={district.id} value={district.id}>
                            {district.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default DistrictSelect;
