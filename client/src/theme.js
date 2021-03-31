import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1b2021',
            contrastText: '#fff',
        },
        secondary: {
            main: '#546e7a',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Bahnschrift, sans-serif',
        },
    },
});

export default theme;
