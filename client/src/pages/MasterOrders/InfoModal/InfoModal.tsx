import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';
import useStyles from '../../../components/Modal/infoModalStyle';

interface InfoModalProps {
    // imageUrl: string;
    order: any;
    header: string;
    isOpen: boolean;
    // setIsOpen: Dispatch<any>;
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
    order,
    // imageUrl,
    header,
    isOpen,
    // setIsOpen,
    closeModal,
}) => {
    const classes = useStyles();

    return (
        <>
            <Dialog
                fullWidth={true}
                onClose={closeModal}
                aria-labelledby="order-title"
                open={isOpen}
            >
                <DialogTitle id="order-title">{header}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="description"
                        label="Описание заказа"
                        className={classes.input}
                        required
                        variant="outlined"
                        value={order.description}
                        // onChange={updateModalChangeHandler}
                    />
                    <form noValidate>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="start_date"
                            label="Дата начала"
                            type="datetime-local"
                            value={order.start_date}
                            // onChange={updateModalChangeHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="end_date"
                            value={order.end_date}
                            label="Дата окончания"
                            type="datetime-local"
                            // onChange={updateModalChangeHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Адрес"
                                secondary={
                                    <Typography variant="body1">
                                        {order.location.name    }
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                    {/* <Address transferAddress={setAddress} /> */}
                    {/* <ImageUploader
                        imagePreviewUrl={imagePreviewUrl}
                        setImagePreviewUrl={setImagePreviewUrl}
                        setFile={setFile} */}
                    {/* /> */}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                        // onClick={openUpdateModalHandler}
                    >
                        Обновить
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        // onClick={openCancelModalHandler}
                    >
                        Отказаться
                    </Button>   
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InfoModal;

// Один инпут для клиента в произвольно формате ля адреса
// диспетчер сам назначает локацию , список мастеров сам подтягивается иссходя из локаций