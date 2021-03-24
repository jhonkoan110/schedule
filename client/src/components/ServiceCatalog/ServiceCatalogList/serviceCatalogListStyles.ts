import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100%',
        },
        addButton: {
            margin: 0,
            display: 'inline-block'
        },
        input: {
            marginBottom: '1rem'
        }
    })
);

export default useStyles;
