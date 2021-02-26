import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#aadd00',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ff0000',
            contrastText: '#fff',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Bahnschrift, sans-serif',
        },
    },
});

export default theme;
