import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    buttonMargin: {
        marginRight: '1rem'
    },
    input: {
        marginBottom: '1rem',
        width: '100%'
    },
    actions: {
        marginBottom: '1rem',
        marginRight:'1rem'
    },
    image: {
        height: '300px',
        marginBottom:'1rem',
        backgroundSize: 'contain'
    },
}))

export default useStyles;