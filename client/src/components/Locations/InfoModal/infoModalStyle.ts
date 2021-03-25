import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    buttonMargin: {
        marginRight: '1rem'
    },
    input: {
        marginBottom: '1rem'
    },
    actions: {
        marginBottom: '1rem',
        marginRight:'1rem'
    }
}))

export default useStyles;