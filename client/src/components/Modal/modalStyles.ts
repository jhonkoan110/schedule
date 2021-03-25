import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    modal: {
        width: '40%'
    },
    closeBtn: {
        position: 'absolute',
        right: '1rem',
        top: '1rem',
    },
    content: {
        display: 'flex',
        flexDirection:'column'
    },
    actions: {
        marginRight: '1rem',
        marginBottom: '1rem'
    }
}));

export default useStyles;
