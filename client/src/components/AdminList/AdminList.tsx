import React from 'react';
import { Card, Grid, List, ListItem, ListItemIcon } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import useStyles from './adminListStyle';

const AdminList: React.FC = () => {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            <ListItem button>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItem>
        </List>
    );
};

export default AdminList;
