import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            height: '350px',
            marginBottom:'1rem',
            backgroundSize: 'contain'
        },
        modalHeader: {
            marginBottom: '1rem'
        }
    })
);
