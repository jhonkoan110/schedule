import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocations } from '../../service/locations';
import { AppStateType } from '../../store/store';
import Block from '../Block/Block';
import Loader from '../Loader/Loader';
import useStyles from './addressStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface AddressProps {
    transferAddress: (address: any) => void;
}

const Address: React.FC<AddressProps> = ({ transferAddress }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const locations = useSelector(
        (state: AppStateType) => state.locationList.locations
    );
    const locationTypes = useSelector(
        (state: AppStateType) => state.locationTypeList.locationTypes
    );

    const isLoading = useSelector(
        (state: AppStateType) => state.locationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.locationList.error
    );

    // const districtInputRef: any = useRef();
    // const streetInputRef: any = useRef();
    // const houseInputRef: any = useRef();
    const locationInputRef: any = useRef();

    const [address, setAddress] = useState({
        district: '',
        street: '',
        house: '',
    });

    // Обработчик автокомплита
    const changeAddressInputHandler = (e: any, newValue: any) => {
        let fieldName: string = e.target.id;

        if (fieldName.startsWith('distr')) {
            fieldName = fieldName.slice(0, 8);
        } else if (fieldName.startsWith('street')) {
            fieldName = fieldName.slice(0, 6);
        } else {
            fieldName = fieldName.slice(0, 5);
        }

        if (newValue) {
            setAddress({
                ...address,
                [fieldName]: newValue.name,
            });
            console.log(address);
        } else {
            if (!e.target.id) {
                console.log(
                    e.currentTarget.parentNode.parentNode.childNodes[0].id
                );
                setAddress({
                    ...address,
                    [e.currentTarget.parentNode.parentNode.childNodes[0].id]:
                        '',
                });
                console.log(e.currentTarget);
            }
        }
    };

    // Обработчик инпутов
    const handleChange = (e: any) => {
        setAddress({
            ...address,
            [e.target.id]: e.target.value,
        });
        console.log(address);
    };

    // Выбрать адрес
    const selectAddressClickHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        console.log(address);
    };

    useEffect(() => {
        console.log('address', address);

        dispatch(getAllLocations());
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Block>
                <Typography variant="h4">{error}</Typography>
            </Block>
        );
    }
    return (
        <>
            <Typography variant='body1' style={{marginBottom: '.5rem'}}>Укажите адрес</Typography>
            <Autocomplete
                id="district"
                options={
                    locations
                        ? locations.filter(
                              (item: any) => item.location_type.name === 'Район'
                          )
                        : []
                }
                getOptionLabel={(option: any) => option.name}
                className={classes.autocomplete}
                onChange={changeAddressInputHandler}
                renderInput={(params) => (
                    <TextField
                        inputRef={locationInputRef}
                        {...params}
                        label="Район"
                        variant="outlined"
                        required
                        onChange={handleChange}
                    />
                )}
            />
            <Autocomplete
                id="street"
                options={
                    locations
                        ? locations.filter(
                              (item: any) => item.location_type.name === 'Улица'
                          )
                        : []
                }
                getOptionLabel={(option: any) => option.name}
                className={classes.autocomplete}
                onChange={changeAddressInputHandler}
                renderInput={(params) => (
                    <TextField
                        inputRef={locationInputRef}
                        {...params}
                        label="Улица"
                        variant="outlined"
                        required
                    />
                )}
            />
            <Autocomplete
                id="house"
                options={
                    locations
                        ? locations.filter(
                              (item: any) => item.location_type.name === 'Дом'
                          )
                        : []
                }
                onChange={changeAddressInputHandler}
                getOptionLabel={(option: any) => option.name}
                className={classes.autocomplete}
                renderInput={(params) => (
                    <TextField
                        inputRef={locationInputRef}
                        {...params}
                        label="Дом"
                        variant="outlined"
                        required
                    />
                )}
            />

            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => transferAddress(address)}
                >
                    Подтвердить адрес
                </Button>
            </CardActions>
        </>
    );
};

export default Address;
