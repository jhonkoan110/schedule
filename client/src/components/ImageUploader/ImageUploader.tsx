import { Button, Card, CardMedia } from '@material-ui/core';
import React from 'react';
import { useStyles } from './imageUploaderStyles';

interface ImageUploaderProps {}

const ImageUploader: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Button
                className={classes.button}
                variant="contained"
                component="label"
                color="primary"
            >
                Загрузить фото
                <input
                    type="file"
                    hidden
                    // onChange={(e) => imageChangeHandler(e)}
                />
            </Button>
            <Card>
                asd
                <CardMedia
                    // className={classes.media}
                    className={classes.image}
                    image="https://upload.wikimedia.org/wikipedia/commons/9/9f/Lacerta_agilis_male_2011_G2.jpg"
                    title="Paella dish"
                />
            </Card>
        </>
    );
};

export default ImageUploader;
