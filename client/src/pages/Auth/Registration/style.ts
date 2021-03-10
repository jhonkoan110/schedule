import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
    return {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
        },
        textField: {
            marginTop: '1rem',
        },
        card: {
            width: '500px',
        },
        fullWidth: {
            width: '100%',
        },
        cardActions: {
            display: 'flex',
            flexDirection: 'column',
        },
        loginButton: {
            margin: '1rem 0',
        },
    };
});

export default useStyles;
