import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    helloThereStyle: {
        fontWeight: 'bold',
        color: 'purple',
        fontSize: '10rem',
    },
    buttonStyles: {
        color: 'green',
        border: 0,
        '&:hover': {
            backgroundColor: 'red',
            border: 0,
        },
    },
});

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.helloThereStyle} variant="h1" color="primary">
                Hello world
            </Typography>
            <Button className={classes.buttonStyles} color="secondary" variant="outlined">
                This is my first button
            </Button>
        </>
    );
};

export default App;
