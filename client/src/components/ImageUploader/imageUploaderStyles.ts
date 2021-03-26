import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        display: 'block',
        width: '160px'
    },
    image: {
        height: '100px'
    }
}))