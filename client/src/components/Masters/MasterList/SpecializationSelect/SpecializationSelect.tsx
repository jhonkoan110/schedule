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
import { getAllSpecializations } from '../../../../service/specializations';
import { ISpecialization } from '../../../../store/specializtions/types';
import { AppStateType } from '../../../../store/store';
import Block from '../../../Block/Block';
import Loader from '../../../Loader/Loader';

interface SpecializationSelectProps {
    transferSelectedSpecialization: Dispatch<any>;
}

const SpecializationSelect: React.FC<SpecializationSelectProps> = ({
    transferSelectedSpecialization,
}) => {
    const dispatch = useDispatch();
    const specializations = useSelector(
        (state: AppStateType) => state.specializationList.specializations
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.specializationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.specializationList.error
    );

    const [
        selectedSpecialization,
        setSelectedSpecialization,
    ] = useState<number>(0);

    const [
        isSelectSpecializationOpen,
        setIsSelectSpecializationOpen,
    ] = useState<boolean>(false);

    // Закрыть селект специализации
    const closeSelectSpecializationHandler = (e: any) => {
        setIsSelectSpecializationOpen(false);
    };
    // Закрыть селект специализации
    const openSelectSpecializationHandler = (e: any) => {
        setIsSelectSpecializationOpen(true);
    };

    // Обработка селекта специализации
    const changeSelectSpecializationHandler = (e: any) => {
        // if (!e.target.value) {

        // }
        setSelectedSpecialization(e.target.value);
        transferSelectedSpecialization(e.target.value);
    };

    useEffect(() => {
        dispatch(getAllSpecializations());
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

    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id="specializtion_label">
                Выбрать специализацию
            </InputLabel>
            <Select
                style={{ marginBottom: '1rem ' }}
                labelId="specializtion_label"
                id="specializtion-open-select"
                open={isSelectSpecializationOpen}
                onClose={closeSelectSpecializationHandler}
                onOpen={openSelectSpecializationHandler}
                value={selectedSpecialization}
                onChange={changeSelectSpecializationHandler}
                defaultValue=""
            >
                {!specializations.length ? (
                    <MenuItem value={0}>
                        <em>Нет доступных специализаций</em>
                    </MenuItem>
                ) : (
                    <MenuItem value={0}>
                        <em>Выбрать специализацию</em>
                    </MenuItem>
                )}

                {specializations.map((specialization: ISpecialization) => {
                    return (
                        <MenuItem
                            key={specialization.id}
                            value={specialization.id}
                        >
                            {specialization.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default SpecializationSelect;
