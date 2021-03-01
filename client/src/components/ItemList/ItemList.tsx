import { List, ListItem } from '@material-ui/core';
import React from 'react';

interface ItemListProps {
    items?: Array<Object>;
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
    return (
        <List>
            {items &&
                items.map((item: any) => {
                    return (
                        <ListItem key={item.id}>
                            {item.login} {item.title}
                        </ListItem>
                    );
                })}
        </List>
    );
};

export default ItemList;
