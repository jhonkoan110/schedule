import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { AppStateType } from '../store/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    })
);
export default function Test() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const roles = useSelector((state: AppStateType) => state.roleList.roles);
    const [role, setRole] = React.useState<string | number>('');

    const handleChange = (event: any) => {
        // setRole(event.target.value as number);
        console.log(event.target.value);
        console.log('roles', roles);
        setRole(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button className={classes.button} onClick={handleOpen}>
                Open the select
            </Button>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                    Age
                </InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={role}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {roles.map((role) => {
                        return (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        );
                    })}

                    {/* <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
        </div>
    );
}
