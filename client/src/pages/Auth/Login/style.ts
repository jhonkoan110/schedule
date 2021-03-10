import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(() => ({
    card: {
        width: '500px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginTop: '1rem',
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'column',
    },
    loginButton: {
        margin: '1rem 0',
    },
}));

export default useStyles;
