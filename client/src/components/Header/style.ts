import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        appBar: {
            marginBottom: '0.5rem',
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        link: {
            display: 'flex',
            color: '#fff',
            '&.active': {
                color: '#bdbdbd ',
            },
        },
        activeLink: {
            color: 'secondary',
        },
        icon: {
            marginRight: theme.spacing(0.5),
        },
        loginButton: {
            marginRight: '1rem',
        },
    };
});

export default useStyles;
