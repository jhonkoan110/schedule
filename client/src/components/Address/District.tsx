import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocations } from '../../service/locations';
import { AppStateType } from '../../store/store';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';

interface DistrictProps {
    transferDistrictName: Dispatch<any>;
}

const District: React.FC<DistrictProps> = ({ transferDistrictName }) => {
    const locations = useSelector(
        (state: AppStateType) => state.locationList.locations
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.locationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.locationList.error
    );

    const districtRef = useRef();
    const dispatch = useDispatch();
    const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
    const [isSelectUserOpen, setIsSelectUserOpen] = useState(false);
    const [districts, setDistricts] = useState(
        locations.filter((location: any) => location.location_type_id === 5)
    );

    // Закрыть селект района
    const closeSelectDistrictHandler = (e: any) => {
        setIsSelectUserOpen(false);
    };

    // Открыть селект района
    const openSelectDistrictHandler = (e: any) => {
        setIsSelectUserOpen(true);
    };

    // Обработчик селектора района
    const changeSelectDistrictHandler = (e: any) => {
        setSelectedDistrict(e.target.value);
        transferDistrictName(e.target.value);
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
        <>
            <FormControl style={{ width: '100%' }}>
                <InputLabel id="user_label">Выбрать район</InputLabel>
                <Select
                    style={{ marginBottom: '1rem ' }}
                    labelId="user_label"
                    id="user-open-select"
                    open={isSelectUserOpen}
                    onClose={closeSelectDistrictHandler}
                    onOpen={openSelectDistrictHandler}
                    value={selectedDistrict}
                    onChange={changeSelectDistrictHandler}
                    inputRef={districtRef}
                    defaultValue=""
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
                    {districts.map((district: any) => {
                        return (
                            <MenuItem key={district.id} value={district.id}>
                                {district.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};

export default District;
