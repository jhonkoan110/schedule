import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLocation, getAllLocations } from '../../../service/locations';
import { AppStateType } from '../../../store/store';
import Error from '../../Error/Error';
import Loader from '../../Loader/Loader';
import useStyles from './locationListStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import {
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { LocationTypes } from '../../../constants/constants';
import AddModal from './AddModal/AddModal';
import { ILocation } from '../../../store/locations/types';

const LocationListTreeView = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    // Функция отрисовки дерева
    const renderTree = (location: any) => (
        <TreeItem
            key={location.id}
            nodeId={location.id.toString()}
            label={
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography>{location.name}</Typography>
                    <ButtonGroup>
                        {/* <IconButton size="small">
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                            <DeleteIcon />
                        </IconButton> */}
                        {location.location_type_id ===
                            LocationTypes.DISTRICT && (
                            <IconButton
                                size="small"
                                onClick={() =>
                                    openAddModalHandler(
                                        'улицы',
                                        LocationTypes.STREET,
                                        location.id
                                    )
                                }
                            >
                                <AddIcon />
                            </IconButton>
                        )}
                        {location.location_type_id === LocationTypes.STREET && (
                            <IconButton
                                size="small"
                                onClick={() =>
                                    openAddModalHandler(
                                        'дома',
                                        LocationTypes.HOUSE,
                                        location.id
                                    )
                                }
                            >
                                <AddIcon />
                            </IconButton>
                        )}
                    </ButtonGroup>
                </Box>
            }
        >
            {Array.isArray(location.children)
                ? location.children.map((child: any) => renderTree(child))
                : null}
        </TreeItem>
    );

    const locations = useSelector(
        (state: AppStateType) => state.locationList.locations
    );
    const isLoading = useSelector(
        (state: AppStateType) => state.locationList.isLoading
    );
    const error = useSelector(
        (state: AppStateType) => state.locationList.error
    );

    const [isAddModalOpen, setIsAddOpenModal] = useState(false);
    const [addModalHeaderText, setAddModalHeaderText] = useState('');
    const [locationType, setLocationType] = useState(0);
    const [parent, setParent] = useState<null | number>(null);
    const [locationData, setLocationData] = useState<ILocation>({
        coordinates: '',
        parent: 0,
        id: 0,
        name: '',
        location_type_id: 0,
    });

    // Отркыть окно добавления
    const openAddModalHandler = (
        text: string,
        locationTypeID: number,
        parentID: null | number
    ) => {
        setAddModalHeaderText(text);
        setLocationType(locationTypeID);
        setParent(parentID);
        setIsAddOpenModal(true);
    };

    // Заркыть окно добавления
    const closeAddModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsAddOpenModal(false);
    };

    // Создать район
    const createLocationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newLocation: ILocation = {
            ...locationData,
            parent: parent,
            location_type_id: locationType,
        };

        dispatch(createLocation(newLocation));
        console.log('newLocation: ', newLocation);
        console.log('locationType: ', locationType);
    };

    // Обработчик инпутов окна добавления
    const addModalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationData({
            ...locationData,
            [e.target.id]: e.target.value,
        });
    };
    useEffect(() => {
        dispatch(getAllLocations());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (locations.length) {
        return (
            <>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            openAddModalHandler(
                                'района',
                                LocationTypes.DISTRICT,
                                null
                            );
                        }}
                    >
                        Добавить район
                    </Button>
                    {locations.map((location: any) => {
                        return renderTree(location);
                    })}
                </TreeView>

                <AddModal
                    locationData={locationData}
                    headerText={addModalHeaderText}
                    isOpen={isAddModalOpen}
                    closeModal={closeAddModalHandler}
                    createLocation={createLocationHandler}
                    onChange={addModalChangeHandler}
                />
            </>
        );
    }
    return null;
};

export default LocationListTreeView;
