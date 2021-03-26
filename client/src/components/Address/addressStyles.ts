import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            marginBottom: '.5rem',
        },
        autocomplete: {
            marginBottom: '.5rem'
        }
    })
);

export default useStyles;
